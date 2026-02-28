import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteJobApplicationUseCase } from '../../core/application/use-cases/delete-job-application.use-case';
import { UpdateJobApplicationUseCase } from '../../core/application/use-cases/update-job-application.use-case';
import { CreateJobApplicationUseCase } from '../../core/application/use-cases/create-job-application.use-case';
import { FindAllJobApplicationUseCase } from '../../core/application/use-cases/find-all-job-application.use-case';
import { AuthGuard } from '../auth/guards/jwt-auth.guard';
import { JobDto } from './dtos/job.dto';

@ApiTags('job-applications')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('job-applications')
export class JobApplicationController {
  constructor(
    private readonly createJobApplicationUseCase: CreateJobApplicationUseCase,
    private readonly findAllJobApplicationUseCase: FindAllJobApplicationUseCase,
    private readonly deleteJobApplicationUseCase: DeleteJobApplicationUseCase,
    private readonly updateJobApplicationUseCase: UpdateJobApplicationUseCase,
  ) {}

  @Post('jobs')
  @ApiOperation({ summary: 'Create a new job application' })
  async create(@Body() body: JobDto, @Request() req) {
    const applicationData = { ...body, userId: req.user.sub };
    return await this.createJobApplicationUseCase.execute(applicationData);
  }

  @Get('jobs')
  @ApiOperation({ summary: 'Find all job applications' })
  async findAll(@Request() req) {
    return await this.findAllJobApplicationUseCase.execute(req.user.sub);
  }

  @Delete('jobs/:id')
  @ApiOperation({ summary: 'Delete a job application' })
  async delete(@Request() req, @Param('id') id: string) {
    return await this.deleteJobApplicationUseCase.execute(id, req.user.sub);
  }
  @Put('jobs/:id')
  @ApiOperation({ summary: 'Update a job application' })
  async update(@Request() req, @Param('id') id: string, @Body() body: JobDto) {
    return await this.updateJobApplicationUseCase.execute(
      id,
      req.user.sub,
      body,
    );
  }
}
