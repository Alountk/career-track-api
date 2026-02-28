import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IJobApplicationRepository } from '../ports/job-application.repository';
import { JOB_APPLICATION_REPOSITORY } from '../ports/job-application.repository';
import { ApplicationStatus, JobApplication } from '../../domain/entities/job-application.entity';
import type { IUserRepository } from '../ports/user.repository';
import { USER_REPOSITORY } from '../ports/user.repository';

export interface CreateJobApplicationCommand {
    company: string;
    position: string;
    status: ApplicationStatus;
    userId: string;
    url?: string;
    salaryRange?: string;
    notes?: string;
}

@Injectable()
export class CreateJobApplicationUseCase {
  constructor(
    @Inject(JOB_APPLICATION_REPOSITORY)
    private readonly jobApplicationRepository: IJobApplicationRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(data: CreateJobApplicationCommand): Promise<void> {
    const existingUser = await this.userRepository.findById(data.userId);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    const jobApplication = new JobApplication(
      crypto.randomUUID(),
      data.company,
      data.position,
      data.status,
      data.userId,
      data.url,
      data.salaryRange,
      data.notes,
      new Date(),
      new Date(),
    );

    await this.jobApplicationRepository.create(jobApplication);
  }
}
