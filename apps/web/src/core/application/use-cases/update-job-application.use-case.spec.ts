import { IJobApplicationRepository } from "@core/domain/repositories/job-application.repository";
import { UpdateJobApplicationUseCase } from "./update-job-application.use-case";
import { JobApplication } from "@core/domain/entities/job-application.entity";
import { vi } from "vitest";

describe('UpdateJobApplicationUseCase', () => {
  let useCase: UpdateJobApplicationUseCase;
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
      update: vi.fn().mockResolvedValue(true),
      create: vi.fn(),
      delete: vi.fn(),
      findById: vi.fn(),
      findAllByUserId: vi.fn(),
    }
    useCase = new UpdateJobApplicationUseCase(mockRepository);
  })

  it('should update a job application', async () => {
    const result = await useCase.execute(mockApplication);
    expect(mockRepository.update).toHaveBeenCalledWith(mockApplication);
    expect(result).toBe(true);
  })
})