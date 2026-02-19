import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import {
  ApplicationStatus,
  JobApplication,
} from '../../domain/entities/job-application.entity';
import { IJobApplicationRepository } from '../ports/job-application.repository';
import { UpdateJobApplicationUseCase } from './update-job-application.use-case';

describe('UpdateJobApplicationUseCase', () => {
  let useCase: UpdateJobApplicationUseCase;
  let jobRepository: jest.Mocked<IJobApplicationRepository>;

  beforeEach(() => {
    jobRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    } as any;

    useCase = new UpdateJobApplicationUseCase(jobRepository);
  });

  it('update correctly job application', async () => {
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

    const updateData = {
      id: jobId,
      userId: userId,
      status: ApplicationStatus.INTERVIEWING,
      notes: 'First interview scheduled!',
    };

    jobRepository.findById.mockResolvedValue(existingJob);

    // WHEN (ACTION)
    await useCase.execute(updateData.id, updateData.userId, updateData);

    // THEN (RESULT)
    expect(jobRepository.update).toHaveBeenCalled();
    const updatedJob = jobRepository.update.mock.calls[0][0];

    expect(updatedJob.status).toBe(ApplicationStatus.INTERVIEWING);
    expect(updatedJob.userId).toBe(userId);
    expect(updatedJob.company).toBe('Google');
    expect(updatedJob.id).toBe(jobId);
  });

  it('should throw UnauthorizedException if user is not the owner', async () => {
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
    await expect(
      useCase.execute(jobId, attackerId, {
        status: ApplicationStatus.REJECTED,
      }),
    ).rejects.toThrow(UnauthorizedException);

    expect(jobRepository.update).not.toHaveBeenCalled();
  });

  it('should throw NotFoundException if job application does not exist', async () => {
    // GIVEN
    jobRepository.findById.mockResolvedValue(null);

    // WHEN & THEN
    await expect(
      useCase.execute('none', 'any', { status: ApplicationStatus.APPLIED }),
    ).rejects.toThrow(NotFoundException);
  });
});
