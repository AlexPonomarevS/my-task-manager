import { DomainEvent } from '@event-nest/core';

@DomainEvent('task-name-updated-event')
export class TaskNameUpdatedEvent {
  constructor(
    public taskId: string,
    public newName: string,
  ) {}
}
