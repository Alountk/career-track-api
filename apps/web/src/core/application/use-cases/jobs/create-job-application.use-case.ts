import type { CreateJobApplication } from '@core/domain/entities/job-application.entity';
import { type IJobApplicationRepository } from '@core/domain/repositories/job-application.repository';

export class CreateJobApplicationUseCase {
  constructor(private readonly repository: IJobApplicationRepository) {}

  async execute(jobApplication: CreateJobApplication): Promise<void> {
    try {
      await this.repository.create(jobApplication);
    } catch {
      throw new Error('API Failure');
    }
  }
}
