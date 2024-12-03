import { DomainEvent } from '@event-nest/core';

@DomainEvent('task-added-to-project-event')
export class TaskAddedToProjectEvent {
  constructor(
    public readonly projectId: string,
    public readonly taskId: string,
  ) {}
}
