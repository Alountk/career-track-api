import type { IJobApplicationRepository } from "@core/domain/repositories/job-application.repository";

export class DeleteJobApplicationUseCase {
  constructor(private readonly repository: IJobApplicationRepository) {}

  async execute(id: string): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      throw new Error('API Failure');
    }
  }
}
