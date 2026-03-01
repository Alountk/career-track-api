import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IJobApplicationRepository } from '@core/domain/repositories/job-application.repository';
import { DeleteJobApplicationUseCase } from './delete-job-application.use-case';

describe('DeleteJobApplicationUseCase', () => {
  let useCase: DeleteJobApplicationUseCase;
  let mockRepository: IJobApplicationRepository;

  beforeEach(() => {
    mockRepository = {
      delete: vi.fn().mockResolvedValue(undefined),
      create: vi.fn(),
      update: vi.fn(),
      findById: vi.fn(),
      findAllByUserId: vi.fn(),
    };
    useCase = new DeleteJobApplicationUseCase(mockRepository);
  });

  it('should delete a job application', async () => {
    const id = '123e4567-e89b-12d3-a456-426614174000';
    const result = await useCase.execute(id);
    expect(mockRepository.delete).toHaveBeenCalledWith(id);
    expect(result).toBe(undefined);
  });

  it('should throw "API Failure" if the repository fails', async () => {
    vi.mocked(mockRepository.delete).mockRejectedValueOnce(
      new Error('Network error'),
    );
    await expect(useCase.execute('any-id')).rejects.toThrow('API Failure');
  });
});
