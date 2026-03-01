import { IJobApplicationRepository } from '@core/domain/repositories/job-application.repository';

export class DeleteJobApplicationUseCase {
  constructor(private readonly repository: IJobApplicationRepository) {}

  async execute(id: string): Promise<void> {
    return await this.repository.delete(id);
  }
}
