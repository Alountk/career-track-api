import type { JobApplication } from '../../domain/entities/job-application.entity';
import type { IJobApplicationRepository } from '../../domain/repositories/job-application.repository';

export class GetAllJobApplicationsUseCase {
  constructor(private readonly repository: IJobApplicationRepository) {}

  async execute(userId: string): Promise<JobApplication[]> {
    try {
      return await this.repository.findAllByUserId(userId);
    } catch (error) {
      throw new Error('API Failure');
    }
  }
}
