import {
  AggregateRoot,
  AggregateRootName,
  ApplyEvent,
  StoredEvent,
} from '@event-nest/core';
import { ProjectCreatedEvent } from '../events/project-created.event';
import { ProjectStatusUpdatedEvent } from '../events/project-status-updated.event';
import { TaskAddedToProjectEvent } from '../events/task-added-to-project.event';
import { MemberAddedToProjectEvent } from '../events/member-added-to-project.event';
import { ProjectStatusRemovedEvent } from '../events/project-status-removed.event';

@AggregateRootName('Project')
export class Project extends AggregateRoot {
  private name: string;
  public members: string[];
  public statuses: string[];
  public tasks: string[];

  private constructor(id: string) {
    super(id);
  }

  public static createNew(
    id: string,
    name: string,
    createdBy: string,
  ): Project {
    const project = new Project(id);
    const event = new ProjectCreatedEvent(name, [], ['CREATED']);
    project.applyProjectCreatedEvent(event);
    project.append(event);

    const eventAddMember = new MemberAddedToProjectEvent(id, createdBy);
    project.applyMemberAddedToProjectEvent(eventAddMember);
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
    const event = new ProjectStatusRemovedEvent(this.id, status);
    this.applyProjectStatusRemovedEvent(event);
    this.append(event);
  }

  public isMember(userId: string): boolean {
    return this.members.includes(userId);
  }

  public addMember(userId: string) {
    const event = new MemberAddedToProjectEvent(this.id, userId);
    this.applyMemberAddedToProjectEvent(event);
    this.append(event);
  }

  public addTask(taskId: string) {
    const event = new TaskAddedToProjectEvent(this.id, taskId);
    this.applyTaskAddedToProjectEvent(event);
    this.append(event);
  }

  @ApplyEvent(ProjectCreatedEvent)
  private applyProjectCreatedEvent(event: ProjectCreatedEvent) {
    this.name = event.name;
    this.members = event.members;
    this.statuses = event.initialStatus;
    this.tasks = [];
  }

  @ApplyEvent(ProjectStatusUpdatedEvent)
  private applyProjectStatusUpdatedEvent(event: ProjectStatusUpdatedEvent) {
    this.statuses.push(event.newStatus);
  }

  @ApplyEvent(TaskAddedToProjectEvent)
  private applyTaskAddedToProjectEvent(event: TaskAddedToProjectEvent) {
    this.tasks.push(event.taskId);
  }

  @ApplyEvent(MemberAddedToProjectEvent)
  private applyMemberAddedToProjectEvent(event: MemberAddedToProjectEvent) {
    this.members.push(event.userId);
  }

  @ApplyEvent(ProjectStatusRemovedEvent)
  private applyProjectStatusRemovedEvent(event: ProjectStatusRemovedEvent) {
    this.statuses = this.statuses.filter((s) => s !== event.status);
  }
}
