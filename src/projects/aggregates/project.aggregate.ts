import {
  AggregateRoot,
  AggregateRootName,
  ApplyEvent,
  StoredEvent,
} from '@event-nest/core';
import { ProjectCreatedEvent } from '../events/project-created.event';
import { ProjectStatusUpdatedEvent } from '../events/project-status-updated.event';

@AggregateRootName('Project')
export class Project extends AggregateRoot {
  private name: string;
  private members: string[];
  private statuses: string[];
  private tasks: string[]; // Новый массив для хранения задач

  private constructor(id: string) {
    super(id);
  }

  public static createNew(
    id: string,
    name: string,
    createdBy: string,
  ): Project {
    const project = new Project(id);
    const event = new ProjectCreatedEvent(name, [createdBy], ['CREATED']);
    project.applyProjectCreatedEvent(event);
    project.append(event);
    return project;
  }

  public static fromEvents(id: string, events: Array<StoredEvent>): Project {
    const project = new Project(id);
    project.reconstitute(events);
    return project;
  }

  public addStatus(newStatus: string) {
    const event = new ProjectStatusUpdatedEvent(this.id, newStatus);
    this.applyProjectStatusUpdatedEvent(event);
    this.append(event);
  }

  public removeStatus(status: string) {
    this.statuses = this.statuses.filter((s) => s !== status);
    // Вам нужно сохранить событие для удаления статуса, если необходимо
  }

  @ApplyEvent(ProjectCreatedEvent)
  private applyProjectCreatedEvent(event: ProjectCreatedEvent) {
    this.name = event.name;
    this.members = event.members;
    this.statuses = event.initialStatus;
  }

  @ApplyEvent(ProjectStatusUpdatedEvent)
  private applyProjectStatusUpdatedEvent(event: ProjectStatusUpdatedEvent) {
    this.statuses.push(event.newStatus);
  }
}
