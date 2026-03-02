import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JOB_APPLICATION_REPOSITORY } from '../core/application/ports/job-application.repository';
import { CreateJobApplicationUseCase } from '../core/application/use-cases/create-job-application.use-case';
import { DeleteJobApplicationUseCase } from '../core/application/use-cases/delete-job-application.use-case';
import { FindAllJobApplicationUseCase } from '../core/application/use-cases/find-all-job-application.use-case';
import { UpdateJobApplicationUseCase } from '../core/application/use-cases/update-job-application.use-case';
import { FindJobApplicationByIdUseCase } from '../core/application/use-cases/find-job-application-by-id.use-case';
import { TypeOrmJobApplicationRepository } from './adapters/typeorm-job-application.repository';
import { AuthModule } from './auth.module';
import { JobApplicationController } from './controllers/job-application.controller';
import { JobApplicationOrmEntity } from './persistence/entities/job-application.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobApplicationOrmEntity]), AuthModule],
  controllers: [JobApplicationController],
  providers: [
    CreateJobApplicationUseCase,
    FindAllJobApplicationUseCase,
    FindJobApplicationByIdUseCase,
    UpdateJobApplicationUseCase,
    DeleteJobApplicationUseCase,
    {
      provide: JOB_APPLICATION_REPOSITORY,
      useClass: TypeOrmJobApplicationRepository,
    },
  ],
})
export class JobModule {}
