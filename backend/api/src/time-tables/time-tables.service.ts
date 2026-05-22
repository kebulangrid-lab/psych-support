import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class TimeTablesService {
  constructor(private readonly supabase: SupabaseService) {}

  private mapToDto(t: any) {
    if (!t) return null;
    return {
      id: t.id,
      program_id: t.program_id,
      date: t.schedule_date,
      time: t.schedule_time,
      topic: t.topic,
      link: t.live_link,
      created_at: t.created_at
    };
  }

  private mapToDb(dto: any) {
    if (!dto) return null;
    const dbObj: any = {};
    if (dto.program_id !== undefined) dbObj.program_id = dto.program_id;
    if (dto.date !== undefined) dbObj.schedule_date = dto.date;
    if (dto.time !== undefined) dbObj.schedule_time = dto.time;
    if (dto.topic !== undefined) dbObj.topic = dto.topic;
    if (dto.link !== undefined) dbObj.live_link = dto.link;
    return dbObj;
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
        .from('time_tables')
        .select('*')
        .in('program_id', enrolledProgramIds)
        .order('created_at', { ascending: false });

      if (error) throw new InternalServerErrorException(error.message);
      return (data || []).map(t => this.mapToDto(t));
    }

    const { data, error } = await this.supabase.client.from('time_tables').select('*').order('created_at', { ascending: false });
    if (error) throw new InternalServerErrorException(error.message);
    return (data || []).map(t => this.mapToDto(t));
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase.client.from('time_tables').select('*').eq('id', id).single();
    if (error) throw new NotFoundException('Record not found');
    return this.mapToDto(data);
  }

  async create(createDto: any) {
    const dbObj = this.mapToDb(createDto);
    const { data, error } = await this.supabase.client.from('time_tables').insert(dbObj).select().single();
    if (error) throw new InternalServerErrorException(error.message);
    return this.mapToDto(data);
  }

  async update(id: string, updateDto: any) {
    const dbObj = this.mapToDb(updateDto);
    const { data, error } = await this.supabase.client.from('time_tables').update(dbObj).eq('id', id).select().single();
    if (error) throw new InternalServerErrorException(error.message);
    return this.mapToDto(data);
  }

  async remove(id: string) {
    const { error } = await this.supabase.client.from('time_tables').delete().eq('id', id);
    if (error) throw new InternalServerErrorException(error.message);
    return { success: true };
  }
}
