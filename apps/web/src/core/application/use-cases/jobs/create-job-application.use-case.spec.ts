import type { IJobApplicationRepository } from '@core/domain/repositories/job-application.repository';
import { createJobApplicationMock } from '@test/factories/job-application.factory';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CreateJobApplicationUseCase } from './create-job-application.use-case';

describe('CreateJobApplicationUseCase', () => {
  let useCase: CreateJobApplicationUseCase;
  let mockRepository: IJobApplicationRepository;
  const mockApplication = createJobApplicationMock();

  beforeEach(() => {
    mockRepository = {
      create: vi.fn().mockResolvedValue(undefined),
      update: vi.fn(),
      delete: vi.fn(),
      findById: vi.fn(),
      findAllByUserId: vi.fn(),
    };
    useCase = new CreateJobApplicationUseCase(mockRepository);
  });

  it('should create a job application', async () => {
    const result = await useCase.execute(mockApplication);
    expect(mockRepository.create).toHaveBeenCalledWith(mockApplication);
    expect(result).toBe(undefined);
  });

  it('should throw "API Failure" if the repository fails', async () => {
    vi.mocked(mockRepository.create).mockRejectedValueOnce(
      new Error('Network error'),
    );
    await expect(useCase.execute(mockApplication)).rejects.toThrow(
      'API Failure',
    );
  });
});
