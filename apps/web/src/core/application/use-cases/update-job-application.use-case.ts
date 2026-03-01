import { JobApplication } from '@core/domain/entities/job-application.entity';
import { IJobApplicationRepository } from '@core/domain/repositories/job-application.repository';

export class UpdateJobApplicationUseCase {
  constructor(private readonly repository: IJobApplicationRepository) {}

  async execute(jobApplication: JobApplication): Promise<boolean> {
    return await this.repository.update(jobApplication);
  }
}
