import { Injectable, Inject } from '@nestjs/common';
import { EVENT_STORE, EventStore } from '@event-nest/core';
import { Project } from './aggregates/project.aggregate';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProjectService {
  constructor(@Inject(EVENT_STORE) private eventStore: EventStore) {}

  async createProject(name: string, createdBy: string) {
    const project = Project.createNew(uuidv4(), name, createdBy); // Используем UUID для создания уникального идентификатора
    const projectWithPublisher = this.eventStore.addPublisher(project);
    await projectWithPublisher.commit();
    return project.id;
  }

  async addStatus(projectId: string, newStatus: string) {
    const events = await this.eventStore.findByAggregateRootId(
      Project,
      projectId,
    );
    const project = Project.fromEvents(projectId, events);
    const projectWithPublisher = this.eventStore.addPublisher(project);
    project.addStatus(newStatus);
    await projectWithPublisher.commit();
  }

  async getProject(id: string) {
    const events = await this.eventStore.findByAggregateRootId(Project, id);
    return Project.fromEvents(id, events);
  }
}
