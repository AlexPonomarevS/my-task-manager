import { DomainEvent } from '@event-nest/core';

@DomainEvent('project-created-event')
export class ProjectCreatedEvent {
  constructor(
    public name: string,
    public members: string[],
    public initialStatus: string[],
  ) {}
}
