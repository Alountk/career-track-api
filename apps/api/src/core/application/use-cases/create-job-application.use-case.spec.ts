import { ApplicationStatus } from '../../domain/entities/job-application.entity';
import { IJobApplicationRepository } from '../ports/job-application.repository';
import { CreateJobApplicationUseCase } from './create-job-application.use-case';
import { IUserRepository } from '../ports/user.repository';

describe('CreateJobApplicationUseCase', () => {
  let useCase: CreateJobApplicationUseCase;
  let userRepository: jest.Mocked<IUserRepository>;
  let jobApplicationRepository: jest.Mocked<IJobApplicationRepository>;

  beforeEach(() => {
    jobApplicationRepository = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      findAllByUserId: jest.fn(),
    } as unknown as jest.Mocked<IJobApplicationRepository>;

    userRepository = {
      findById: jest.fn(),
      save: jest.fn(),
      findByEmail: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;

    useCase = new CreateJobApplicationUseCase(
      jobApplicationRepository,
      userRepository,
    );
  });

  it('should create a new job application when user exists', async () => {
    // GIVEN
    const data = {
      company: 'Google',
      position: 'Senior Frontend Developer',
      status: ApplicationStatus.APPLIED,
      userId: 'user-id',
      url: 'https://careers.google.com/jobs/123',
      salaryRange: '100000-150000',
      notes: 'I am interested in this position',
    };

    // Mock the repository
    userRepository.findById.mockResolvedValue({
      id: 'user-id',
    } as unknown as any); // Still any here because of User entity complex constructor, but better than before.
    // Wait, I should use the real User or empty object casted to unknown.
    userRepository.findById.mockResolvedValue({
      id: 'user-id',
    } as unknown as any);

    // WHEN (ACTION)
    await useCase.execute(data);

    // THEN (RESULT)
    expect(jobApplicationRepository.create).toHaveBeenCalled();
    const callArgs = jobApplicationRepository.create.mock.calls[0][0];
    expect(callArgs.company).toBe('Google');
    expect(callArgs.userId).toBe('user-id');
  });

  it('should throw NotFoundException when user does not exist', async () => {
    // GIVEN: The Repository returns null
    const data = {
      company: 'Google',
      position: 'Senior Frontend Developer',
      status: ApplicationStatus.APPLIED,
      userId: '',
      url: 'https://careers.google.com/jobs/123',
      salaryRange: '100000-150000',
      notes: 'I am interested in this position',
    };
    userRepository.findById.mockResolvedValue(null);

    // WHEN & THEN
    await expect(useCase.execute(data)).rejects.toThrow('User not found');
  });
});
