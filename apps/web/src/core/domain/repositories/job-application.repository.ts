import { CreateJobApplication, JobApplication } from "../entities/job-application.entity";

export interface IJobApplicationRepository {
  create(jobApplication: CreateJobApplication): Promise<void>;
  update(jobApplication: JobApplication): Promise<boolean>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<JobApplication | null>;
  findAllByUserId(userId: string): Promise<JobApplication[]>;
}