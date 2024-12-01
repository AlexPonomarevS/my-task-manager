import {
  AggregateRoot,
  AggregateRootName,
  ApplyEvent,
  StoredEvent,
} from '@event-nest/core';
import { ProjectCreatedEvent } from '../events/project-created.event';

@AggregateRootName('Project')
export class Project extends AggregateRoot {
  private name: string;

  private constructor(id: string) {
    super(id);
  }

  public static createNew(id: string, name: string): Project {
    const project = new Project(id);
    const event = new ProjectCreatedEvent(name);
    project.applyProjectCreatedEvent(event);
    project.append(event);
    return project;
  }

  public static fromEvents(id: string, events: Array<StoredEvent>): Project {
    const project = new Project(id);
    project.reconstitute(events);
    return project;
  }

  @ApplyEvent(ProjectCreatedEvent)
  private applyProjectCreatedEvent(event: ProjectCreatedEvent) {
    this.name = event.name;
  }
}
