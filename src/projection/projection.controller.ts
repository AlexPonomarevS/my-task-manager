import { Controller, Get } from '@nestjs/common';
import { ProjectionService } from './projection.service';
import { User } from './user.entity';
import { ProjectStatus } from './project-status.entity';
import { ProjectMembers } from './project-members.entity';
import { ProjectTasks } from './project-tasks.entity';
import { Task } from './task.entity';

@Controller('projection')
export class ProjectionController {
  constructor(private readonly projectionService: ProjectionService) {}

  @Get('users')
  async findAll(): Promise<User[]> {
    return this.projectionService.findAll();
  }

  @Get('project-statuses')
  async findAllStatuses(): Promise<ProjectStatus[]> {
    return this.projectionService.findAllStatuses();
  }

  @Get('project-members')
  async findAllMembers(): Promise<ProjectMembers[]> {
    return this.projectionService.findAllMembers();
  }

  @Get('project-tasks')
  async findAllTasks(): Promise<ProjectTasks[]> {
    return this.projectionService.findAllTasks();
  }

  @Get('tasks')
  async findTasks(): Promise<Task[]> {
    return this.projectionService.findTasks();
  }
}
