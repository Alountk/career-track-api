import { JobApplication } from '../../../core/domain/entities/job-application.entity';
import { JobApplicationOrmEntity } from '../entities/job-application.orm-entity';

export class JobApplicationMapper {
  static toDomain(ormEntity: JobApplicationOrmEntity): JobApplication {
    return new JobApplication(
      ormEntity.id,
      ormEntity.company,
      ormEntity.position,
      ormEntity.status,
      ormEntity.userId,
      ormEntity.url,
      ormEntity.salaryRange,
      ormEntity.notes,
      ormEntity.createdAt,
      ormEntity.updatedAt,
    );
  }

  static toOrm(domainEntity: JobApplication): JobApplicationOrmEntity {
    const orm = new JobApplicationOrmEntity();
    orm.id = domainEntity.id;
    orm.company = domainEntity.company;
    orm.position = domainEntity.position;
    orm.status = domainEntity.status;
    orm.userId = domainEntity.userId;
    orm.url = domainEntity.url;
    orm.salaryRange = domainEntity.salaryRange;
    orm.notes = domainEntity.notes;
    return orm;
  }
}
