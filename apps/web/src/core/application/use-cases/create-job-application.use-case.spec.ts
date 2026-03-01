import { IJobApplicationRepository } from '@core/domain/repositories/job-application.repository';
import { CreateJobApplicationUseCase } from './create-job-application.use-case';
import { JobApplication } from '@core/domain/entities/job-application.entity';
import { vi } from 'vitest';

describe('CreateJobApplicationUseCase', () => {
  let useCase: CreateJobApplicationUseCase;
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
});
