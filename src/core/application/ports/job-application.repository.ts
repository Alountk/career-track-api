import { JobApplication } from '../../domain/entities/job-application.entity';

export interface IJobApplicationRepository {
  create(jobApplication: JobApplication): Promise<void>;
  update(jobApplication: JobApplication): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<JobApplication | null>;
  findAllByUserId(userId: string): Promise<JobApplication[]>;
}

export const JOB_APPLICATION_REPOSITORY = 'Job_Application_Repository';
