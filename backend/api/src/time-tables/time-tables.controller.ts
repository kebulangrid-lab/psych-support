import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TimeTablesService } from './time-tables.service';

@Controller('api/time-tables')
export class TimeTablesController {
  constructor(private readonly service: TimeTablesService) {}

  @Post()
  create(@Body() createDto: any) {
    return this.service.create(createDto);
  }

  @Get()
  findAll(@Query('client_id') clientId?: string) {
    return this.service.findAll(clientId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
