import { z } from 'zod';

export const JobApplicationsStatus = z.enum([
  'PENDING',
  'APPLIED',
  'INTERVIEWING',
  'OFFER',
  'REJECTED',
]);

export type JobApplicationStatus = z.infer<typeof JobApplicationsStatus>;

export const JobApplicationSchema = z.object({
  id: z.string().uuid(),
  company: z.string().min(1, 'Company name is required'),
  position: z.string().min(1, 'Position is required'),
  status: JobApplicationsStatus,
  userId: z.string().uuid(),
  url: z.string().url().optional(),
  salaryRange: z.string().optional(),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type JobApplication = z.infer<typeof JobApplicationSchema>;

export const CreateJobApplicationSchema = JobApplicationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true, 
});

export type CreateJobApplication = z.infer<typeof CreateJobApplicationSchema>;