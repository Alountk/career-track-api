import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import {
  ApplicationStatus,
  JobApplication,
} from '../../domain/entities/job-application.entity';
import { IJobApplicationRepository } from '../ports/job-application.repository';
import { DeleteJobApplicationUseCase } from './delete-job-application.use-case';

describe('DeleteJobApplicationUseCase', () => {
  let useCase: DeleteJobApplicationUseCase;
  let jobRepository: jest.Mocked<IJobApplicationRepository>;

  beforeEach(() => {
    jobRepository = {
      findById: jest.fn(),
      delete: jest.fn(),
    } as any;

    useCase = new DeleteJobApplicationUseCase(jobRepository);
  });

  it('if job application not exist throw a error not found', async () => {
    // GIVEN
    jobRepository.findById.mockResolvedValue(null);
    const ownerId = 'user-123';
    const jobId = 'job-999';

    jobRepository.findById.mockResolvedValue(null);

    // WHEN & THEN
    await expect(useCase.execute('none', ownerId)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('if userId is not the same userId into existingJob throw a unauthorized', async () => {
    // GIVEN
    const ownerId = 'user-123';
    const attackerId = 'user-666';
    const jobId = 'job-999';
    const existingJob = new JobApplication(
      jobId,
      'Google',
      'Dev',
      ApplicationStatus.APPLIED,
      ownerId,
    );

    jobRepository.findById.mockResolvedValue(existingJob);

    // WHEN & THEN
    await expect(useCase.execute(jobId, attackerId)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should delete the job application successfully', async () => {
    // GIVEN
    const userId = 'user-123';
    const jobId = 'job-999';
    const existingJob = new JobApplication(
      jobId,
      'Google',
      'Dev',
      ApplicationStatus.APPLIED,
      userId,
    );

    jobRepository.findById.mockResolvedValue(existingJob);

    // WHEN
    await useCase.execute(jobId, userId);

    // THEN
    expect(jobRepository.delete).toHaveBeenCalledWith(jobId);
  })
});
