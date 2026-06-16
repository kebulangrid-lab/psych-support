import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnrollmentsService {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly configService: ConfigService
  ) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async findAll(clientId?: string) {
    let query = this.supabase.client.from('enrollments').select('*, profiles(full_name, country_code, mobile_number)');
    if (clientId) {
      query = query.eq('client_id', clientId);
    }
    const { data, error } = await query;
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase.client.from('enrollments').select('*, profiles(full_name, country_code, mobile_number)').eq('id', id).single();
    if (error) throw new NotFoundException('Record not found');
    return data;
  }

  async create(createDto: any) {
    const { data, error } = await this.supabase.client.from('enrollments').insert(createDto).select().single();
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async update(id: string, updateDto: any) {
    if (updateDto.payment_status === 'completed') {
      try {
        const { data: current } = await this.supabase.client.from('enrollments').select('proof_of_payment_url').eq('id', id).single();
        if (current && current.proof_of_payment_url) {
          const url = current.proof_of_payment_url;
          const match = url.match(/\/([^\/]+)\/upload\/v\d+\/(.+)$/);
          if (match) {
            const resourceType = match[1];
            let publicId = match[2];
            if (resourceType !== 'raw') {
               const lastDot = publicId.lastIndexOf('.');
               if (lastDot !== -1) publicId = publicId.substring(0, lastDot);
            }
            await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
          }
          updateDto.proof_of_payment_url = null;
        }
      } catch (err) {
        console.error('Failed to delete proof from Cloudinary:', err);
      }
    }
    
    const { data, error } = await this.supabase.client.from('enrollments').update(updateDto).eq('id', id).select().single();
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async remove(id: string) {
    const { error } = await this.supabase.client.from('enrollments').delete().eq('id', id);
    if (error) throw new InternalServerErrorException(error.message);
    return { success: true };
  }
}
