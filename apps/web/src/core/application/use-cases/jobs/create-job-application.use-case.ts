import type { JobApplication } from '@core/domain/entities/job-application.entity';
import { type IJobApplicationRepository } from '@core/domain/repositories/job-application.repository';

export class CreateJobApplicationUseCase {
  constructor(private readonly repository: IJobApplicationRepository) {}

  async execute(jobApplication: JobApplication): Promise<void> {
    try {
      await this.repository.create(jobApplication);
    } catch (error) {
      throw new Error('API Failure');
    }
  }
}
