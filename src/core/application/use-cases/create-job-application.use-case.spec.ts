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
    } as any;

    userRepository = {
      findById: jest.fn(),
    } as any;

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
    } as any);

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
