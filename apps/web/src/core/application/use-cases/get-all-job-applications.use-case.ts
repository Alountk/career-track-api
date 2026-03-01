import type { IJobApplicationRepository } from '../../domain/repositories/job-application.repository';
import type { JobApplication } from '../../domain/entities/job-application.entity';

export class GetAllJobApplicationsUseCase {
  constructor(private readonly repository: IJobApplicationRepository) {}

  async execute(userId: string): Promise<JobApplication[]> {
    return this.repository.findAllByUserId(userId);
  }
}
