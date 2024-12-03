import { Injectable, Inject } from '@nestjs/common';
import { EVENT_STORE, EventStore } from '@event-nest/core';
import { Project } from './aggregates/project.aggregate';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Aggregate } from '../typeORM/aggregate.entity';
import { Repository } from 'typeorm';
import { User } from '../users/aggregates/user.aggregate';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Aggregate)
    private readonly aggregateRepository: Repository<Aggregate>,
    @Inject(EVENT_STORE) private eventStore: EventStore,
  ) {}

  async createProject(name: string, createdBy: string) {
    const projectId = uuidv4();
    const project = Project.createNew(projectId, name, createdBy);
    const projectWithPublisher = this.eventStore.addPublisher(project);
    await projectWithPublisher.commit();

    return project.id;
  }

  async getAllProjects(userId: string) {
    const aggregates = await this.aggregateRepository.find();
    const aggregatesIds = aggregates.map((aggregate) => aggregate.id);
    const projectsEvents = await this.eventStore.findByAggregateRootIds(
      Project,
      aggregatesIds,
    );
    const projects = aggregatesIds
      .map((id) => {
        const events = projectsEvents[id];
        if (events) {
          return Project.fromEvents(id, events);
        } else {
          return null;
        }
      })
      .filter(
        (project) => project !== null && project.members.includes(userId),
      );
    return projects;
  }

  async getProject(id: string) {
    const events = await this.eventStore.findByAggregateRootId(Project, id);
    return Project.fromEvents(id, events);
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

  async addMember(projectId: string, userId: string) {
    const events = await this.eventStore.findByAggregateRootId(
      Project,
      projectId,
    );
    const project = Project.fromEvents(projectId, events);
    const projectWithPublisher = this.eventStore.addPublisher(project);
    project.addMember(userId);
    await projectWithPublisher.commit();
  }

  async getUsersByProject(projectId: string) {
    const eventProject = await this.eventStore.findByAggregateRootId(
      Project,
      projectId,
    );
    const project = Project.fromEvents(projectId, eventProject);
    const usersIds = project.members;
    const eventsUsers = await this.eventStore.findByAggregateRootIds(
      User,
      usersIds,
    );
    const users = usersIds.map((id) => {
      const events = eventsUsers[id];
      return User.fromEvents(id, events);
    });
    return users;
  }
}
