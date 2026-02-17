import { Body, Controller, Get, Post, Query, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateJobApplicationUseCase } from "../../core/application/use-cases/create-job-application.use-case";
import { FindAllJobApplicationUseCase } from "../../core/application/use-cases/find-all-job-application.use-case";
import { JobDto } from "./dtos/job.dto";
import { AuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags('job-applications')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('job-applications')
export class JobApplicationController {
    constructor(
        private readonly createJobApplicationUseCase: CreateJobApplicationUseCase,
        private readonly findAllJobApplicationUseCase: FindAllJobApplicationUseCase,
    ) {}

    @Post('jobs')
    @ApiOperation({ summary: 'Create a new job application' })
    async create(@Body() body: JobDto, @Request() req) {
        const applicationData = { ...body, userId: req.user.sub }
        return await this.createJobApplicationUseCase.execute(applicationData);
    }

    @Get('jobs')
    @ApiOperation({ summary: 'Find all job applications' })
    async findAll(@Request() req) {
        return await this.findAllJobApplicationUseCase.execute(req.user.sub);
    }
}