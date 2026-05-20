import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ProgramsService {
  constructor(private readonly supabase: SupabaseService) {}

  async findAll() {
    const { data, error } = await this.supabase.client.from('programs').select('*').order('created_at', { ascending: false });
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase.client.from('programs').select('*').eq('id', id).single();
    if (error) throw new NotFoundException('Program not found');
    return data;
  }

  async create(createDto: any) {
    const { data, error } = await this.supabase.client.from('programs').insert(createDto).select().single();
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async update(id: string, updateDto: any) {
    const { data, error } = await this.supabase.client.from('programs').update(updateDto).eq('id', id).select().single();
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async remove(id: string) {
    const { error } = await this.supabase.client.from('programs').delete().eq('id', id);
    if (error) throw new InternalServerErrorException(error.message);
    return { success: true, message: 'Program deleted successfully' };
  }
}
