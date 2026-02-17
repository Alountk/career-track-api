import { Module } from "@nestjs/common";
import { JobApplicationController } from "./controllers/job-application.controller";
import { CreateJobApplicationUseCase } from "../core/application/use-cases/create-job-application.use-case";
import { FindAllJobApplicationUseCase } from "../core/application/use-cases/find-all-job-application.use-case";
import { JOB_APPLICATION_REPOSITORY } from "../core/application/ports/job-application.repository";
import { InMemoryJobRepository } from "./adapters/in-memory-job.repository";
import { AuthModule } from "./auth.module";

@Module({
    imports: [AuthModule],
    controllers: [JobApplicationController],
    providers: [
        CreateJobApplicationUseCase,
        FindAllJobApplicationUseCase,
        {
            provide: JOB_APPLICATION_REPOSITORY,
            useClass: InMemoryJobRepository,
        }
    ],
})
export class JobModule {}   