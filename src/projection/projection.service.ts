import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ProjectStatus } from './project-status.entity';
import { ProjectMembers } from './project-members.entity';
import { ProjectTasks } from './project-tasks.entity';
import { Task } from './task.entity';

@Injectable()
export class ProjectionService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ProjectStatus)
    private readonly projectStatusRepository: Repository<ProjectStatus>,
    @InjectRepository(ProjectMembers)
    private readonly projectMembersRepository: Repository<ProjectMembers>,
    @InjectRepository(ProjectTasks)
    private readonly projectTasksRepository: Repository<ProjectTasks>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findAllStatuses(): Promise<ProjectStatus[]> {
    return this.projectStatusRepository.find();
  }

  async findAllMembers(): Promise<ProjectMembers[]> {
    return this.projectMembersRepository.find();
  }

  async findAllTasks(): Promise<ProjectTasks[]> {
    return this.projectTasksRepository.find();
  }

  async findTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }
}
