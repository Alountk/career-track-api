import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateJobApplicationUseCase } from "../../core/application/use-cases/create-job-application.use-case";
import { FindAllJobApplicationUseCase } from "../../core/application/use-cases/find-all-job-application.use-case";
import { JobDto } from "./dtos/job.dto";

@ApiTags('job-applications')
@Controller('job-applications')
export class JobApplicationController {
    constructor(
        private readonly createJobApplicationUseCase: CreateJobApplicationUseCase,
        private readonly findAllJobApplicationUseCase: FindAllJobApplicationUseCase,
    ) {}

    @Post('jobs')
    @ApiOperation({ summary: 'Create a new job application' })
    async create(@Body() body: JobDto) {
        return await this.createJobApplicationUseCase.execute(body);
    }

    @Get('jobs')
    @ApiOperation({ summary: 'Find all job applications' })
    async findAll(@Query('userId') userId: string) {
        return await this.findAllJobApplicationUseCase.execute(userId);
    }
}