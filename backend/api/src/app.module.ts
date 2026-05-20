import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { ProgramsModule } from './programs/programs.module';
import { TimeTablesModule } from './time-tables/time-tables.module';
import { ResourcesModule } from './resources/resources.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { SupportModule } from './support/support.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SupabaseModule, 
    ProgramsModule, 
    TimeTablesModule, 
    ResourcesModule, 
    EnrollmentsModule, 
    SupportModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
