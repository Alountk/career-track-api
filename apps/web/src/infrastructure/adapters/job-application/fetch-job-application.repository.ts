import { JobApplicationSchema, type CreateJobApplication, type JobApplication } from "@core/domain/entities/job-application.entity";
import type { IJobApplicationRepository } from "@core/domain/repositories/job-application.repository";

export class FetchJobApplicationRepository implements IJobApplicationRepository {
  private readonly baseUrl = 'http://localhost:3000/job-applications'; // For the momento use that but after move into .env
  private readonly headers = {
    'Content-Type': 'application/json',
  }

  async create(jobApplication: CreateJobApplication): Promise<void> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(jobApplication),
    });

    if (!response.ok) {
      throw new Error('Error network')
    }
  }

  async update(jobApplication: JobApplication): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/${jobApplication.id}`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(jobApplication),
    });
    if (!response.ok) {
      throw new Error('Error network')
    }
    return true;
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    });
    if (!response.ok) {
      throw new Error('Error network')
    }
  }

  async findById(id: string): Promise<JobApplication | null> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'GET',
      headers: this.headers,
    });

    if(response.status === 404) return null;
    
    if (!response.ok) {
      throw new Error('Error network')
    }

    const data = await response.json();
    return JobApplicationSchema.parse({
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    })
  }

  async findAllByUserId(userId: string): Promise<JobApplication[]> {
    const response = await fetch(`${this.baseUrl}/${userId}`);

    if (!response.ok) {
      throw new Error('Error network');
    }
    const data = await response.json();
    
    return data.map((item: JobApplication) => {
      return JobApplicationSchema.parse({
        ...item,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      })
    })
  }
  
}