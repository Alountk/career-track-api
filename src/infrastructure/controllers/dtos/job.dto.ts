import { ApiProperty } from "@nestjs/swagger";
import { ApplicationStatus } from "../../../core/domain/entities/job-application.entity";

export class JobDto {
    @ApiProperty({ example: 'Google' })
    company: string;

    @ApiProperty({ example: 'Senior Frontend Developer' })
    position: string;

    @ApiProperty({ example: ApplicationStatus.APPLIED })
    status: ApplicationStatus;

    @ApiProperty({ example: 'user-id' })
    userId: string;

    @ApiProperty({ example: 'https://careers.google.com/jobs/123' })
    url: string;

    @ApiProperty({ example: '100000-150000' })
    salaryRange: string;

    @ApiProperty({ example: 'I am interested in this position' })
    notes: string;
}