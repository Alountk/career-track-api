import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { JOB_APPLICATION_REPOSITORY, type IJobApplicationRepository } from "../ports/job-application.repository";
import { USER_REPOSITORY, type IUserRepository } from "../ports/user.repository";

@Injectable()
export class FindAllJobApplicationUseCase {
    constructor(
      @Inject(JOB_APPLICATION_REPOSITORY)
      private readonly jobApplicationRepository: IJobApplicationRepository,
      @Inject(USER_REPOSITORY)
      private readonly userRepository: IUserRepository,
    ) {}

    async execute(userId: string) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return this.jobApplicationRepository.findAllByUserId(userId);
    }
}

