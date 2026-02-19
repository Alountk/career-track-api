import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApplicationStatus,
  JobApplication,
} from '../../domain/entities/job-application.entity';
import {
  JOB_APPLICATION_REPOSITORY,
  type IJobApplicationRepository,
} from '../ports/job-application.repository';
import {
  USER_REPOSITORY,
  type IUserRepository,
} from '../ports/user.repository';

export interface UpdateJobApplicationCommand {
  company?: string;
  position?: string;
  status?: ApplicationStatus;
  url?: string;
  salaryRange?: string;
  notes?: string;
}

@Injectable()
export class UpdateJobApplicationUseCase {
  constructor(
    @Inject(JOB_APPLICATION_REPOSITORY)
    private readonly jobApplicationRepository: IJobApplicationRepository,
  ) {}

  async execute(
    id: string,
    userId: string,
    data: UpdateJobApplicationCommand,
  ): Promise<void> {
    const existingJob = await this.jobApplicationRepository.findById(id);
    if (!existingJob) {
      throw new NotFoundException('Job application not found');
    }
    if (existingJob.userId !== userId) {
      throw new UnauthorizedException('User is not the owner of the job application');
    }

    const updatedJobApplication = new JobApplication(
      id,
      data.company || existingJob.company,
      data.position || existingJob.position,
      data.status || existingJob.status,
      userId,
      data.url || existingJob.url,
      data.salaryRange || existingJob.salaryRange,
      data.notes || existingJob.notes,
      existingJob.createdAt,
      new Date(),
    );
    await this.jobApplicationRepository.update(updatedJobApplication);
  }
}
