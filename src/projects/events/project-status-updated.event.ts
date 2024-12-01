import { DomainEvent } from '@event-nest/core';

@DomainEvent('project-status-updated-event')
export class ProjectStatusUpdatedEvent {
  constructor(
    public projectId: string,
    public newStatus: string,
  ) {}
}
