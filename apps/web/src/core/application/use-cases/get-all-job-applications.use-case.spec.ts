import { beforeEach, describe, expect, it, vi } from 'vitest';
import { JobApplication } from '../../domain/entities/job-application.entity';
import type { IJobApplicationRepository } from '../../domain/repositories/job-application.repository';
import { GetAllJobApplicationsUseCase } from './get-all-job-applications.use-case';

describe('GetAllJobApplicationsUseCase', () => {
  let useCase: GetAllJobApplicationsUseCase;
  let mockRepository: IJobApplicationRepository;

  const mockApplications: JobApplication[] = [
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      company: 'Test Company',
      position: 'Developer',
      status: 'APPLIED',
      userId: 'user-123',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(() => {
    mockRepository = {
      findAllByUserId: vi.fn().mockResolvedValue(mockApplications),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      findById: vi.fn(),
    };
    useCase = new GetAllJobApplicationsUseCase(mockRepository);
  });

  it('debería devolver todas las aplicaciones de un usuario específico', async () => {
    const userId = 'user-123';
    const result = await useCase.execute(userId);

    expect(mockRepository.findAllByUserId).toHaveBeenCalledWith(userId);
    expect(result).toEqual(mockApplications);
  });
});
