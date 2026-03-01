import { JobApplication } from '@core/domain/entities/job-application.entity';
import { IJobApplicationRepository } from '@core/domain/repositories/job-application.repository';

export class CreateJobApplicationUseCase {
  constructor(private readonly repository: IJobApplicationRepository) {}

  async execute(jobApplication: JobApplication): Promise<void> {
    return await this.repository.create(jobApplication);
  }
}
