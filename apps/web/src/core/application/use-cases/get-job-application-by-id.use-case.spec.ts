import { beforeEach, describe, expect, it, vi } from 'vitest';
import { IJobApplicationRepository } from '@core/domain/repositories/job-application.repository';
import { GetJobApplicationByIdUseCase } from './get-job-application-by-id.use-case';
import { JobApplication } from '@core/domain/entities/job-application.entity';
import { createJobApplicationMock } from 'test/factories/job-application.factory';

describe('GetJobApplicationByIdUseCase', () => {
  let useCase: GetJobApplicationByIdUseCase;
  let mockRepository: IJobApplicationRepository;

  const mockApplication: JobApplication = createJobApplicationMock({ id: '123e4567-e89b-12d3-a456-426614174000' });

  beforeEach(() => {
    mockRepository = {
      findById: vi.fn().mockResolvedValue(mockApplication),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      findAllByUserId: vi.fn(),
    };
    useCase = new GetJobApplicationByIdUseCase(mockRepository);
  });

  it('should return a job application by its id', async () => {
    const id = '123e4567-e89b-12d3-a456-426614174000';
    const result = await useCase.execute(id);

    expect(mockRepository.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockApplication);
  });

  it('should throw an error if job application is not found', async () => {
    const id = 'non-existent-id';
    vi.mocked(mockRepository.findById).mockRejectedValueOnce(new Error('Network error'));
    await expect(useCase.execute(id)).rejects.toThrowError('API Failure');
  });
});
