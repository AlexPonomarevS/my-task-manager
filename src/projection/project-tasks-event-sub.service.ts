import { Injectable } from '@nestjs/common';
import {
  PublishedDomainEvent,
  DomainEventSubscription,
  OnDomainEvent,
} from '@event-nest/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskAddedToProjectEvent } from '../projects/events/task-added-to-project.event';
import { ProjectTasks } from './project-tasks.entity';

@Injectable()
@DomainEventSubscription(TaskAddedToProjectEvent)
export class ProjectTasksEventSubService
  implements OnDomainEvent<TaskAddedToProjectEvent>
{
  constructor(
    @InjectRepository(ProjectTasks)
    private readonly projectTasksRepository: Repository<ProjectTasks>,
  ) {}

  async onDomainEvent(
    event: PublishedDomainEvent<TaskAddedToProjectEvent>,
  ): Promise<unknown> {
    const projTasks = new ProjectTasks();
    projTasks.projectId = event.payload.projectId;
    projTasks.taskId = event.payload.taskId;

    await this.projectTasksRepository.save(projTasks);
    return Promise.resolve();
  }
}
