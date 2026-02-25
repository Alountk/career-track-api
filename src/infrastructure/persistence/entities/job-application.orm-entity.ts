import { ApplicationStatus } from 'src/core/domain/entities/job-application.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { UserOrmEntity } from './user.orm-entity';

@Entity('job_applications')
export class JobApplicationOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  company: string;
  @Column()
  position: string;
  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.APPLIED,
  })
  status: ApplicationStatus;
  @Column()
  userId: string;
  
  // Referential integrity 
  @ManyToOne(() => UserOrmEntity)
  @JoinColumn({ name: 'userId' })
  user: UserOrmEntity;
  @Column({ nullable: true })
  url: string;
  @Column({ nullable: true })
  salaryRange: string;
  @Column({ type: 'text', nullable: true })
  notes: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
