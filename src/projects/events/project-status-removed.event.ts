import { DomainEvent } from '@event-nest/core';

@DomainEvent('project-status-removed-event')
export class ProjectStatusRemovedEvent {
  constructor(
    public projectId: string,
    public status: string,
  ) {}
}
