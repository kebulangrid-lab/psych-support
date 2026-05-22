import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class ResourcesService {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly configService: ConfigService,
  ) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async findAll(clientId?: string) {
    if (clientId) {
      const { data: enrollments, error: enrollmentError } = await this.supabase.client
        .from('enrollments')
        .select('program_id')
        .eq('client_id', clientId)
        .eq('payment_status', 'completed');

      if (enrollmentError) throw new InternalServerErrorException(enrollmentError.message);

      const enrolledProgramIds = (enrollments || []).map(e => e.program_id);
      if (enrolledProgramIds.length === 0) {
        return [];
      }

      const { data, error } = await this.supabase.client
        .from('resources')
        .select('*')
        .in('program_id', enrolledProgramIds)
        .order('created_at', { ascending: false });

      if (error) throw new InternalServerErrorException(error.message);
      return data;
    }

    const { data, error } = await this.supabase.client.from('resources').select('*').order('created_at', { ascending: false });
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase.client.from('resources').select('*').eq('id', id).single();
    if (error) throw new NotFoundException('Record not found');
    return data;
  }

  private uploadToCloudinary(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.pdf`;
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          folder: 'psych-support-resources',
          public_id: uniqueId,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      uploadStream.end(file.buffer);
    });
  }

  async create(file: Express.Multer.File, body: any) {
    try {
      const cloudinaryResult = await this.uploadToCloudinary(file);
      const cloudinaryUrl = cloudinaryResult.secure_url;

      const insertData = {
        program_id: body.program_id,
        title: body.title,
        cloudinary_url: cloudinaryUrl,
        resource_type: 'pdf',
      };

      const { data, error } = await this.supabase.client
        .from('resources')
        .insert(insertData)
        .select()
        .single();

      if (error) throw new InternalServerErrorException(error.message);
      return data;
    } catch (err: any) {
      console.error('Cloudinary/Supabase upload error:', err);
      throw new InternalServerErrorException(err.message || 'Failed to upload and save resource.');
    }
  }

  async update(id: string, updateDto: any) {
    const { data, error } = await this.supabase.client.from('resources').update(updateDto).eq('id', id).select().single();
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async remove(id: string) {
    const resource = await this.findOne(id);
    if (resource && resource.cloudinary_url) {
      try {
        const url = resource.cloudinary_url;
        const match = url.match(/\/([^\/]+)\/upload\/v\d+\/(.+)$/);
        if (match) {
          const resourceType = match[1];
          const publicIdWithExt = match[2];
          let publicId = publicIdWithExt;
          if (resourceType !== 'raw') {
            const lastDot = publicIdWithExt.lastIndexOf('.');
            if (lastDot !== -1) {
              publicId = publicIdWithExt.substring(0, lastDot);
            }
          }
          await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType,
          });
        }
      } catch (cloudinaryErr) {
        console.error(`Failed to delete asset from Cloudinary for resource ${id}:`, cloudinaryErr);
      }
    }

    const { error } = await this.supabase.client.from('resources').delete().eq('id', id);
    if (error) throw new InternalServerErrorException(error.message);
    return { success: true };
  }
}
