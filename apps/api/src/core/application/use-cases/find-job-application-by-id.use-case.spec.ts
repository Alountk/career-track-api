import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  ApplicationStatus,
  JobApplication,
} from '../../domain/entities/job-application.entity';
import { User } from '../../domain/entities/user.entity';
import { JOB_APPLICATION_REPOSITORY } from '../ports/job-application.repository';
import { USER_REPOSITORY } from '../ports/user.repository';
import { FindJobApplicationByIdUseCase } from './find-job-application-by-id.use-case';

describe('FindJobApplicationByIdUseCase', () => {
  let useCase: FindJobApplicationByIdUseCase;
  let jobApplicationRepo: any;
  let userRepo: any;

  const userId = 'user-uuid';
  const jobId = 'job-uuid';
  const mockUser = new User(
    userId,
    'Test',
    'User',
    'test@example.com',
    'password',
    'user',
    new Date(),
    new Date(),
  );
  const mockJobApplication = new JobApplication(
    jobId,
    'Test Company',
    'Developer',
    ApplicationStatus.APPLIED,
    userId,
    'https://example.com',
    '80k',
    'Notes',
  );

  beforeEach(async () => {
    jobApplicationRepo = {
      findById: jest.fn(),
    };
    userRepo = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindJobApplicationByIdUseCase,
        {
          provide: JOB_APPLICATION_REPOSITORY,
          useValue: jobApplicationRepo,
        },
        {
          provide: USER_REPOSITORY,
          useValue: userRepo,
        },
      ],
    }).compile();

    useCase = module.get<FindJobApplicationByIdUseCase>(
      FindJobApplicationByIdUseCase,
    );
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return job application when found and belongs to user', async () => {
    userRepo.findById.mockResolvedValue(mockUser);
    jobApplicationRepo.findById.mockResolvedValue(mockJobApplication);

    const result = await useCase.execute(jobId, userId);

    expect(result).toEqual(mockJobApplication);
    expect(userRepo.findById).toHaveBeenCalledWith(userId);
    expect(jobApplicationRepo.findById).toHaveBeenCalledWith(jobId);
  });

  it('should throw NotFoundException when user not found', async () => {
    userRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute(jobId, userId)).rejects.toThrow(
      new NotFoundException('User not found'),
    );
  });

  it('should throw NotFoundException when job application not found', async () => {
    userRepo.findById.mockResolvedValue(mockUser);
    jobApplicationRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute(jobId, userId)).rejects.toThrow(
      new NotFoundException('Job application not found'),
    );
  });

  it('should throw NotFoundException when job application belongs to another user', async () => {
    const anotherJob = { ...mockJobApplication, userId: 'another-user' };
    userRepo.findById.mockResolvedValue(mockUser);
    jobApplicationRepo.findById.mockResolvedValue(anotherJob);

    await expect(useCase.execute(jobId, userId)).rejects.toThrow(
      new NotFoundException('Job application not found'),
    );
  });
});
