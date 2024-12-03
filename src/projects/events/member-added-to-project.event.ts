import { DomainEvent } from '@event-nest/core';

@DomainEvent('member-added-to-project-event')
export class MemberAddedToProjectEvent {
  constructor(
    public readonly projectId: string,
    public readonly userId: string,
  ) {}
}
