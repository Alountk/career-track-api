import { JobApplication } from '../../src/core/domain/entities/job-application.entity';

export function createJobApplicationMock(
  overrides: Partial<JobApplication> = {},
): JobApplication {
  return {
    id: crypto.randomUUID(),
    company: 'Default Company',
    position: 'Frontend Developer',
    status: 'PENDING',
    userId: crypto.randomUUID(),
    url: 'https://example.com/job',
    salaryRange: '40k - 50k',
    notes: 'Some default notes',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

export function createJobApplicationListMock(
  count: number,
  userId?: string,
): JobApplication[] {
  const finalUserId = userId || crypto.randomUUID();
  return Array.from({ length: count }, () =>
    createJobApplicationMock({ userId: finalUserId }),
  );
}
