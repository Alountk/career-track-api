import { beforeEach, describe, expect, it, vi } from 'vitest';
import { JobApplication } from '../../domain/entities/job-application.entity';
import type { IJobApplicationRepository } from '../../domain/repositories/job-application.repository';
import { GetAllJobApplicationsUseCase } from './get-all-job-applications.use-case';
import { createJobApplicationListMock } from '@test/factories/job-application.factory';

describe('GetAllJobApplicationsUseCase', () => {
  let useCase: GetAllJobApplicationsUseCase;
  let mockRepository: IJobApplicationRepository;
  let userId: string = '123e4567-e89b-12d3-a456-426614174000';
  let otherUserId: string = '123e4567-e89b-12d3-a456-426614174001';

  let mockJobApplications: JobApplication[] = createJobApplicationListMock(
    4,
    userId,
  );

  beforeEach(() => {
    mockRepository = {
      findAllByUserId: vi.fn().mockResolvedValue(mockJobApplications),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      findById: vi.fn(),
    };
    useCase = new GetAllJobApplicationsUseCase(mockRepository);
  });

  it('debería devolver todas las aplicaciones de un usuario específico', async () => {
    const result = await useCase.execute(userId);

    expect(mockRepository.findAllByUserId).toHaveBeenCalledWith(userId);
    expect(result.length).toBe(4);
  });

  it('should return throw error when repository fails', async () => {
    vi.mocked(mockRepository.findAllByUserId).mockRejectedValueOnce(
      new Error('Error network'),
    );
    await expect(useCase.execute(userId)).rejects.toThrowError('API Failure');
  });
});
