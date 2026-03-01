import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IJobApplicationRepository } from '@core/domain/repositories/job-application.repository';
import { UpdateJobApplicationUseCase } from './update-job-application.use-case';
import { createJobApplicationMock } from '../../../../test/factories/job-application.factory';

describe('UpdateJobApplicationUseCase', () => {
  let useCase: UpdateJobApplicationUseCase;
  let mockRepository: IJobApplicationRepository;
  const mockApplication = createJobApplicationMock();

  beforeEach(() => {
    mockRepository = {
      update: vi.fn().mockResolvedValue(true),
      create: vi.fn(),
      delete: vi.fn(),
      findById: vi.fn(),
      findAllByUserId: vi.fn(),
    };
    useCase = new UpdateJobApplicationUseCase(mockRepository);
  });

  it('should update a job application', async () => {
    const result = await useCase.execute(mockApplication);
    expect(mockRepository.update).toHaveBeenCalledWith(mockApplication);
    expect(result).toBe(true);
  });

  it('should throw "API Failure" if the repository fails', async () => {
    vi.mocked(mockRepository.update).mockRejectedValueOnce(
      new Error('Network error'),
    );
    await expect(useCase.execute(mockApplication)).rejects.toThrow(
      'API Failure',
    );
  });
});
