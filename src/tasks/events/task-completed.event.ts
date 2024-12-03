import { DomainEvent } from '@event-nest/core';

@DomainEvent('task-completed-event')
export class TaskCompletedEvent {
  constructor(
    public taskId: string,
    public completed: boolean,
  ) {}
}
