import { Module } from '@nestjs/common';
import { TimeTablesController } from './time-tables.controller';
import { TimeTablesService } from './time-tables.service';

@Module({
  controllers: [TimeTablesController],
  providers: [TimeTablesService]
})
export class TimeTablesModule {}
