import type { JobApplication } from '@core/domain/entities/job-application.entity';
import type { IJobApplicationRepository } from '@core/domain/repositories/job-application.repository';

export class UpdateJobApplicationUseCase {
  constructor(private readonly repository: IJobApplicationRepository) {}

  async execute(jobApplication: JobApplication): Promise<boolean> {
    try {
      return await this.repository.update(jobApplication);
    } catch (error) {
      throw new Error('API Failure');
    }
  }
}
