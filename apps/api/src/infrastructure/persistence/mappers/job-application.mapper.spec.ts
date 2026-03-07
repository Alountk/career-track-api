import { JobApplicationMapper } from './job-application.mapper';
import {
  JobApplication,
  ApplicationStatus,
} from '../../../core/domain/entities/job-application.entity';
import { JobApplicationOrmEntity } from '../entities/job-application.orm-entity';

describe('JobApplicationMapper', () => {
  const mockOrmEntity: Partial<JobApplicationOrmEntity> = {
    id: '123',
    company: 'Test Company',
    position: 'Developer',
    status: ApplicationStatus.APPLIED,
    userId: 'user1',
    url: 'https://test.com',
    salaryRange: '40k-50k',
    notes: 'Some notes',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockDomainEntity = new JobApplication(
    '123',
    'Test Company',
    'Developer',
    ApplicationStatus.APPLIED,
    'user1',
    'https://test.com',
    '40k-50k',
    'Some notes',
    mockOrmEntity.createdAt,
    mockOrmEntity.updatedAt,
  );

  it('should map ORM entity to domain entity', () => {
    const result = JobApplicationMapper.toDomain(
      mockOrmEntity as JobApplicationOrmEntity,
    );
    expect(result).toBeInstanceOf(JobApplication);
    expect(result.id).toBe(mockOrmEntity.id);
    expect(result.company).toBe(mockOrmEntity.company);
  });

  it('should map domain entity to ORM entity', () => {
    const result = JobApplicationMapper.toOrm(mockDomainEntity);
    expect(result.id).toBe(mockDomainEntity.id);
    expect(result.company).toBe(mockDomainEntity.company);
    expect(result.position).toBe(mockDomainEntity.position);
    expect(result.status).toBe(mockDomainEntity.status);
  });
});
