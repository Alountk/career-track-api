export enum ApplicationStatus {
  APPLIED = 'APPLIED',
  INTERVIEWING = 'INTERVIEWING',
  OFFERED = 'OFFERED',
  REJECTED = 'REJECTED',
  COLD_CONTACT = 'COLD_CONTACT',
  INTERVIEW_SCHEDULED = 'INTERVIEW_SCHEDULED',
  INTERVIEW = 'INTERVIEW',
}

export class JobApplication {
  constructor(
    public readonly id: string,
    public readonly company: string,
    public readonly position: string,
    public readonly status: ApplicationStatus,
    public readonly userId: string,
    public readonly url?: string,
    public readonly salaryRange?: string,
    public readonly notes?: string,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
  ) {}
}
