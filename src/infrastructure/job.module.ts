import { Module } from '@nestjs/common';
import { DeleteJobApplicationUseCase } from 'src/core/application/use-cases/delete-job-application.use-case';
import { UpdateJobApplicationUseCase } from 'src/core/application/use-cases/update-job-application.use-case';
import { JOB_APPLICATION_REPOSITORY } from '../core/application/ports/job-application.repository';
import { CreateJobApplicationUseCase } from '../core/application/use-cases/create-job-application.use-case';
import { FindAllJobApplicationUseCase } from '../core/application/use-cases/find-all-job-application.use-case';
import { InMemoryJobRepository } from './adapters/in-memory-job.repository';
import { AuthModule } from './auth.module';
import { JobApplicationController } from './controllers/job-application.controller';

@Module({
  imports: [AuthModule],
  controllers: [JobApplicationController],
  providers: [
    CreateJobApplicationUseCase,
    FindAllJobApplicationUseCase,
    UpdateJobApplicationUseCase,
    DeleteJobApplicationUseCase,
    {
      provide: JOB_APPLICATION_REPOSITORY,
      useClass: InMemoryJobRepository,
    },
  ],
})
export class JobModule {}
