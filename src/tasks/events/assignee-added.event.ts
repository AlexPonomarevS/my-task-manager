import { DomainEvent } from '@event-nest/core';

@DomainEvent('assignee-added-event')
export class AssigneeAddedEvent {
  constructor(
    public taskId: string,
    public userId: string,
  ) {}
}
