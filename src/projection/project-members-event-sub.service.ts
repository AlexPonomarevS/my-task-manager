import { Injectable } from '@nestjs/common';
import {
  PublishedDomainEvent,
  DomainEventSubscription,
  OnDomainEvent,
} from '@event-nest/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberAddedToProjectEvent } from '../projects/events/member-added-to-project.event';
import { ProjectMembers } from './project-members.entity';

@Injectable()
@DomainEventSubscription(MemberAddedToProjectEvent)
export class ProjectMembersEventSubService
  implements OnDomainEvent<MemberAddedToProjectEvent>
{
  constructor(
    @InjectRepository(ProjectMembers)
    private readonly projectMemberRepository: Repository<ProjectMembers>,
  ) {}

  async onDomainEvent(
    event: PublishedDomainEvent<MemberAddedToProjectEvent>,
  ): Promise<unknown> {
    const projMember = new ProjectMembers();
    projMember.projectId = event.payload.projectId;
    projMember.userId = event.payload.userId;

    await this.projectMemberRepository.save(projMember);
    return Promise.resolve();
  }
}
