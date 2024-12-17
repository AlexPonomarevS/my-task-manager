import { Injectable } from '@nestjs/common';
import {
  PublishedDomainEvent,
  DomainEventSubscription,
  OnDomainEvent,
} from '@event-nest/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectStatus } from './project-status.entity';
import { ProjectStatusUpdatedEvent } from '../projects/events/project-status-updated.event';
import { ProjectStatusRemovedEvent } from '../projects/events/project-status-removed.event';

@Injectable()
@DomainEventSubscription(ProjectStatusUpdatedEvent, ProjectStatusRemovedEvent)
export class ProjectStatusEventSubscription
  implements
    OnDomainEvent<ProjectStatusUpdatedEvent | ProjectStatusRemovedEvent>
{
  constructor(
    @InjectRepository(ProjectStatus)
    private readonly projectStatusRepository: Repository<ProjectStatus>,
  ) {}

  async onDomainEvent(
    event: PublishedDomainEvent<
      ProjectStatusUpdatedEvent | ProjectStatusRemovedEvent
    >,
  ): Promise<void> {
    if ('newStatus' in event.payload && 'projectId' in event.payload) {
      const projectStatus = new ProjectStatus();
      console.log('add');
      projectStatus.projectId = event.payload.projectId;

      projectStatus.status = event.payload.newStatus;

      await this.projectStatusRepository.save(projectStatus);
    } else if ('status' in event.payload && 'projectId' in event.payload) {
      console.log('remove');
      await this.projectStatusRepository.delete({
        projectId: event.payload.projectId,
        status: event.payload.status,
      });
    }
  }
}
