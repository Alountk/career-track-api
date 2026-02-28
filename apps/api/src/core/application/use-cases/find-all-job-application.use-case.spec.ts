import { ApplicationStatus } from '../../domain/entities/job-application.entity';
import { IJobApplicationRepository } from '../ports/job-application.repository';
import { IUserRepository } from '../ports/user.repository';
import { FindAllJobApplicationUseCase } from './find-all-job-application.use-case';
import { CreateJobApplicationUseCase } from './create-job-application.use-case';

describe('FindAllJobApplicationUseCase', () => {
  let useCase: FindAllJobApplicationUseCase;
  let createJobApplicationUseCase: CreateJobApplicationUseCase;
  let jobApplicationRepository: jest.Mocked<IJobApplicationRepository>;
  let userRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    jobApplicationRepository = {
      findAllByUserId: jest.fn(),
    } as any;

    userRepository = {
      findById: jest.fn(),
    } as any;

    createJobApplicationUseCase = new CreateJobApplicationUseCase(
      jobApplicationRepository,
      userRepository,
    );

    useCase = new FindAllJobApplicationUseCase(
      jobApplicationRepository,
      userRepository,
    );
  });

  it('should return all job applications for a user', async () => {
    // GIVEN
    const userId = 'user-id';

    const jobApplication1 = {
      id: 'job-application-id',
      company: 'Google',
      position: 'Senior Frontend Developer',
      status: ApplicationStatus.APPLIED,
      userId: 'user-id',
      url: 'https://careers.google.com/jobs/123',
      salaryRange: '100000-150000',
      notes: 'I am interested in this position',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const jobApplication2 = {
      id: 'job-application-id-2',
      company: 'Microsoft',
      position: 'Senior Fullstack Developer',
      status: ApplicationStatus.INTERVIEW,
      userId: 'user-id',
      url: 'https://careers.microsoft.com/jobs/123',
      salaryRange: '100000-150000',
      notes: 'I am interested in this position',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const jobApplications = [jobApplication1, jobApplication2];

    // Mock the repository
    jobApplicationRepository.findAllByUserId.mockResolvedValue(jobApplications);
    userRepository.findById.mockResolvedValue({
      id: 'user-id',
    } as any);

    // WHEN (ACTION)
    const result = await useCase.execute(userId);

    // THEN (RESULT)
    expect(jobApplicationRepository.findAllByUserId).toHaveBeenCalledWith(
      userId,
    );
    expect(result).toEqual(jobApplications);
  });

  it('if job application don\'t exist throw a not found', () => {

  })
});
