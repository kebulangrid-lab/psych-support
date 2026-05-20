import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class EnrollmentsService {
  constructor(private readonly supabase: SupabaseService) {}

  async findAll() {
    const { data, error } = await this.supabase.client.from('enrollments').select('*');
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase.client.from('enrollments').select('*').eq('id', id).single();
    if (error) throw new NotFoundException('Record not found');
    return data;
  }

  async create(createDto: any) {
    const { data, error } = await this.supabase.client.from('enrollments').insert(createDto).select().single();
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async update(id: string, updateDto: any) {
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
