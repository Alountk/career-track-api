import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IJobApplicationRepository } from '../../core/application/ports/job-application.repository';
import { JobApplication } from '../../core/domain/entities/job-application.entity';
import { JobApplicationOrmEntity } from '../persistence/entities/job-application.orm-entity';
import { JobApplicationMapper } from '../persistence/mappers/job-application.mapper';

export class TypeOrmJobApplicationRepository implements IJobApplicationRepository {
  constructor(
    @InjectRepository(JobApplicationOrmEntity)
    private readonly repository: Repository<JobApplicationOrmEntity>,
  ) {}

  async create(jobApplication: JobApplication): Promise<void> {
    const ormJobApplication = JobApplicationMapper.toOrm(jobApplication);
    await this.repository.save(ormJobApplication);
  }

  async update(jobApplication: JobApplication): Promise<boolean> {
    const ormJobApplication = JobApplicationMapper.toOrm(jobApplication);
    const result = await this.repository.update(
      { id: ormJobApplication.id },
      ormJobApplication,
    );
    return (result.affected || 0) > 0;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ id });
  }

  async findById(id: string): Promise<JobApplication | null> {
    const ormJobApplication = await this.repository.findOneBy({ id });
    return ormJobApplication
      ? JobApplicationMapper.toDomain(ormJobApplication)
      : null;
  }

  async findAllByUserId(userId: string): Promise<JobApplication[]> {
    const ormJobApplication = await this.repository.findBy({ userId });
    return ormJobApplication
      ? ormJobApplication.map((job) => JobApplicationMapper.toDomain(job))
      : [];
  }
}
