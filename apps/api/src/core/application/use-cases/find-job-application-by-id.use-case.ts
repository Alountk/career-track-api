import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  JOB_APPLICATION_REPOSITORY,
  type IJobApplicationRepository,
} from '../ports/job-application.repository';
import {
  USER_REPOSITORY,
  type IUserRepository,
} from '../ports/user.repository';

@Injectable()
export class FindJobApplicationByIdUseCase {
  constructor(
    @Inject(JOB_APPLICATION_REPOSITORY)
    private readonly jobApplicationRepository: IJobApplicationRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string, userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const jobApplication = await this.jobApplicationRepository.findById(id);
    if (!jobApplication) {
      throw new NotFoundException('Job application not found');
    }
    if (jobApplication.userId !== userId) {
      throw new NotFoundException('Job application not found');
    }
    return jobApplication;
  }
}
