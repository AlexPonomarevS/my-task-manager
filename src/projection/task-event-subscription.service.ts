import { Injectable } from '@nestjs/common';
import {
  PublishedDomainEvent,
  DomainEventSubscription,
  OnDomainEvent,
} from '@event-nest/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskCreatedEvent } from '../tasks/events/task-created.event';
import { TaskCompletedEvent } from '../tasks/events/task-completed.event';
import { TaskNameUpdatedEvent } from '../tasks/events/task-name-updated.event';
import { TaskStatusUpdatedEvent } from '../tasks/events/task-status-updated.event';
@Injectable()
@DomainEventSubscription(
  TaskCreatedEvent,
  TaskCompletedEvent,
  TaskNameUpdatedEvent,
  TaskStatusUpdatedEvent,
)
export class TaskEventSubscription
  implements
    OnDomainEvent<
      | TaskCreatedEvent
      | TaskCompletedEvent
      | TaskNameUpdatedEvent
      | TaskStatusUpdatedEvent
    >
{
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async onDomainEvent(
    event: PublishedDomainEvent<
      | TaskCreatedEvent
      | TaskCompletedEvent
      | TaskNameUpdatedEvent
      | TaskStatusUpdatedEvent
    >,
  ): Promise<void> {
    if (
      'name' in event.payload &&
      'projectId' in event.payload &&
      'taskId' in event.payload
    ) {
      const task = new Task();
      task.name = event.payload.name;
      task.id = event.payload.taskId;
      task.projectID = event.payload.projectId;
      task.status = 'CREATED';
      task.completed = false;

      await this.taskRepository.save(task);
    }
    if ('taskId' in event.payload && 'completed' in event.payload) {
      const task = await this.taskRepository.findOneBy({
        id: event.payload.taskId,
      });
      task.completed = event.payload.completed;
      await this.taskRepository.save(task);
    }
    if ('taskId' in event.payload && 'newName' in event.payload) {
      const task = await this.taskRepository.findOneBy({
        id: event.payload.taskId,
      });
      task.name = event.payload.newName;
      await this.taskRepository.save(task);
    }
    if ('taskId' in event.payload && 'newStatus' in event.payload) {
      const task = await this.taskRepository.findOneBy({
        id: event.payload.taskId,
      });
      task.status = event.payload.newStatus;
      await this.taskRepository.save(task);
    }
  }
}
