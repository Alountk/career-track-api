import { beforeEach, describe, expect, it, vi } from 'vitest';
import { IJobApplicationRepository } from '@core/domain/repositories/job-application.repository';
import { GetJobApplicationByIdUseCase } from './get-job-application-by-id.use-case';
import { JobApplication } from '@core/domain/entities/job-application.entity';

describe('GetJobApplicationByIdUseCase', () => {
  let useCase: GetJobApplicationByIdUseCase;
  let mockRepository: IJobApplicationRepository;

  const mockApplication: JobApplication = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    company: 'Test Company',
    position: 'Developer',
    status: 'APPLIED',
    userId: 'user-123',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

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
});
