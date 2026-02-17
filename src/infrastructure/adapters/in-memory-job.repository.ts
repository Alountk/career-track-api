import { JobApplication } from '../../core/domain/entities/job-application.entity';
import type { IJobApplicationRepository } from '../../core/application/ports/job-application.repository';

export class InMemoryJobRepository implements IJobApplicationRepository {
  private jobs: JobApplication[] = [];

  async create(jobApplication: JobApplication): Promise<void> {
    this.jobs.push(jobApplication);
  }

  async update(jobApplication: JobApplication): Promise<void> {
    const index = this.jobs.findIndex((j) => j.id === jobApplication.id);
    if (index !== -1) {
      this.jobs[index] = jobApplication;
    }
  }

  async delete(id: string): Promise<void> {
    this.jobs = this.jobs.filter((j) => j.id !== id);
  }

  async findById(id: string): Promise<JobApplication | null> {
    return this.jobs.find((j) => j.id === id) || null;
  }

  async findAllByUserId(userId: string): Promise<JobApplication[]> {
    return this.jobs.filter((j) => j.userId === userId);
  }
}
