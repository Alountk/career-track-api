import { ApiProperty } from '@nestjs/swagger';
import { ApplicationStatus } from '../../../core/domain/entities/job-application.entity';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class JobDto {
  @ApiProperty({ example: 'Google' })
  @IsString()
  company: string;

  @ApiProperty({ example: 'Senior Frontend Developer' })
  @IsString()
  position: string;

  @ApiProperty({ example: ApplicationStatus.APPLIED })
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;

  @ApiProperty({ example: 'user-id' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 'https://careers.google.com/jobs/123' })
  @IsString()
  @IsOptional()
  url: string;

  @ApiProperty({ example: '100000-150000' })
  @IsString()
  @IsOptional()
  salaryRange: string;

  @ApiProperty({ example: 'I am interested in this position' })
  @IsString()
  @IsOptional()
  notes: string;
}
