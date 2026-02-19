import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { type IJobApplicationRepository, JOB_APPLICATION_REPOSITORY } from "../ports/job-application.repository";

@Injectable()
export class DeleteJobApplicationUseCase {
  constructor(
    @Inject(JOB_APPLICATION_REPOSITORY)
    private readonly jobApplicationRepository: IJobApplicationRepository,
  ) {}

  async execute(id: string, userId: string): Promise<void> {
    const existingJob = await this.jobApplicationRepository.findById(id);

    if(!existingJob) {
      throw new NotFoundException('The job application not exist');
    }

    if(userId !== existingJob.userId) {
      throw new UnauthorizedException('User is not the owner of the job application');
    }

    await this.jobApplicationRepository.delete(id);
  }
}