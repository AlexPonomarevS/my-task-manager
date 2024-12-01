import {
  AggregateRoot,
  AggregateRootName,
  ApplyEvent,
  StoredEvent,
} from '@event-nest/core';
import { TaskCreatedEvent } from '../events/task-created.event';
import { TaskStatusUpdatedEvent } from '../events/task-status-updated.event';

@AggregateRootName('Task')
export class Task extends AggregateRoot {
  private name: string;
  private status: string;
  private projectId: string;

  private constructor(id: string) {
    super(id);
  }

  public static createNew(id: string, projectId: string, name: string): Task {
    const task = new Task(id);
    const event = new TaskCreatedEvent(projectId, name);
    task.applyTaskCreatedEvent(event);
    task.append(event);
    return task;
  }

  public static fromEvents(id: string, events: Array<StoredEvent>): Task {
    const task = new Task(id);
    task.reconstitute(events);
    return task;
  }

  public updateStatus(newStatus: string) {
    const event = new TaskStatusUpdatedEvent(this.id, newStatus);
    this.applyTaskStatusUpdatedEvent(event);
    this.append(event);
  }

  @ApplyEvent(TaskCreatedEvent)
  private applyTaskCreatedEvent(event: TaskCreatedEvent) {
    this.name = event.name;
    this.status = 'CREATED'; // Статус по умолчанию
    this.projectId = event.projectId;
  }

  @ApplyEvent(TaskStatusUpdatedEvent)
  private applyTaskStatusUpdatedEvent(event: TaskStatusUpdatedEvent) {
    this.status = event.newStatus;
  }
}
