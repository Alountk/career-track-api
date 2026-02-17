import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './infrastructure/controllers/health.controller';
import { AuthModule } from './infrastructure/auth.module';
import { JobModule } from './infrastructure/job.module';

@Module({
  imports: [AuthModule, JobModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
