import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgramsService } from './programs.service';

@Controller('api/programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  create(@Body() createProgramDto: any) {
    return this.programsService.create(createProgramDto);
  }

  @Get()
  findAll() {
    return this.programsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramDto: any) {
    return this.programsService.update(id, updateProgramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programsService.remove(id);
  }
}
