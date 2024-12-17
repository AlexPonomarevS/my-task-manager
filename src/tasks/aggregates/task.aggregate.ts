import {
  AggregateRoot,
  AggregateRootName,
  ApplyEvent,
  StoredEvent,
} from '@event-nest/core';
import { TaskCreatedEvent } from '../events/task-created.event';
import { TaskStatusUpdatedEvent } from '../events/task-status-updated.event';
import { TaskCompletedEvent } from '../events/task-completed.event';
import { AssigneeAddedEvent } from '../events/assignee-added.event';
import { TaskNameUpdatedEvent } from '../events/task-name-updated.event';

@AggregateRootName('Task')
export class Task extends AggregateRoot {
  private name: string;
  private status: string;
  private projectId: string;
  private completed: boolean;
  public assignees: string[];

  private constructor(id: string) {
    super(id);
  }

  public static createNew(id: string, projectId: string, name: string): Task {
    const task = new Task(id);
    const event = new TaskCreatedEvent(id, projectId, name);
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

  public completeTask() {
    const event = new TaskCompletedEvent(this.id, !this.completed);
    this.applyTaskCompletedEvent(event);
    this.append(event);
  }

  public addAssignee(userId: string) {
    const event = new AssigneeAddedEvent(this.id, userId);
    this.applyAssigneeAddedEvent(event);
    this.append(event);
  }

  public updateName(newName: string) {
    const event = new TaskNameUpdatedEvent(this.id, newName);
    this.applyTaskNameUpdatedEvent(event);
    this.append(event);
  }

  @ApplyEvent(TaskCreatedEvent)
  private applyTaskCreatedEvent(event: TaskCreatedEvent) {
    this.name = event.name;
    this.status = 'CREATED';
    this.projectId = event.projectId;
    this.completed = false;
    this.assignees = [];
  }

  @ApplyEvent(TaskStatusUpdatedEvent)
  private applyTaskStatusUpdatedEvent(event: TaskStatusUpdatedEvent) {
    this.status = event.newStatus;
  }

  @ApplyEvent(TaskCompletedEvent)
  private applyTaskCompletedEvent(event: TaskCompletedEvent) {
    this.completed = event.completed;
  }

  @ApplyEvent(AssigneeAddedEvent)
  private applyAssigneeAddedEvent(event: AssigneeAddedEvent) {
    this.assignees.push(event.userId);
  }

  @ApplyEvent(TaskNameUpdatedEvent)
  private applyTaskNameUpdatedEvent(event: TaskNameUpdatedEvent) {
    this.name = event.newName;
  }
}
