import { DomainEvent } from '@event-nest/core';

@DomainEvent('task-status-updated-event')
export class TaskStatusUpdatedEvent {
  constructor(
    public taskId: string,
    public newStatus: string,
  ) {}
}
