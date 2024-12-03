import { DomainEvent } from '@event-nest/core';

@DomainEvent('task-created-event')
export class TaskCreatedEvent {
  constructor(
    public taskId: string,
    public projectId: string,
    public name: string,
  ) {}
}
