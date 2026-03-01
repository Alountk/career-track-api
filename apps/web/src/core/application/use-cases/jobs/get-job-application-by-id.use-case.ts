import type { IJobApplicationRepository } from '../../../domain/repositories/job-application.repository';
import type { JobApplication } from '../../../domain/entities/job-application.entity';

export class GetJobApplicationByIdUseCase {
  constructor(private readonly repository: IJobApplicationRepository) {}

  async execute(id: string): Promise<JobApplication | null> {
    try {
      return await this.repository.findById(id);
    } catch (error) {
      throw new Error('API Failure');
    }
  }
}
