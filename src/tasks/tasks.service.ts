import { Injectable, Inject } from '@nestjs/common';
import { EVENT_STORE, EventStore } from '@event-nest/core';
import { Task } from './aggregates/task.aggregate';
import { Project } from '../projects/aggregates/project.aggregate';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../users/aggregates/user.aggregate';

@Injectable()
export class TaskService {
  constructor(@Inject(EVENT_STORE) private eventStore: EventStore) {}

  async createTask(projectId: string, name: string) {
    const projectEvents = await this.eventStore.findByAggregateRootId(
      Project,
      projectId,
    );
    const project = Project.fromEvents(projectId, projectEvents);

    const taskId = uuidv4();
    const task = Task.createNew(taskId, projectId, name);
    const taskWithPublisher = this.eventStore.addPublisher(task);
    await taskWithPublisher.commit();

    project.addTask(taskId); // Добавляем задачу в проект
    const projectWithPublisher = this.eventStore.addPublisher(project);
    await projectWithPublisher.commit();

    return task;
  }

  async updateTaskStatus(id: string, newStatus: string) {
    const events = await this.eventStore.findByAggregateRootId(Task, id);
    const task = Task.fromEvents(id, events);
    const taskWithPublisher = this.eventStore.addPublisher(task);
    task.updateStatus(newStatus);
    await taskWithPublisher.commit();
  }

  async completeTask(id: string) {
    const events = await this.eventStore.findByAggregateRootId(Task, id);
    const task = Task.fromEvents(id, events);
    const taskWithPublisher = this.eventStore.addPublisher(task);
    task.completeTask();
    await taskWithPublisher.commit();
  }

  async addAssignee(taskId: string, userId: string, projectId: string) {
    const projectEvents = await this.eventStore.findByAggregateRootId(
      Project,
      projectId,
    );
    const project = Project.fromEvents(projectId, projectEvents);

    if (!project.isMember(userId)) {
      throw new Error('User is not a member of the project');
    }

    const taskEvents = await this.eventStore.findByAggregateRootId(
      Task,
      taskId,
    );
    const task = Task.fromEvents(taskId, taskEvents);
    const taskWithPublisher = this.eventStore.addPublisher(task);
    task.addAssignee(userId);
    await taskWithPublisher.commit();
  }

  async getTask(id: string) {
    const events = await this.eventStore.findByAggregateRootId(Task, id);
    return Task.fromEvents(id, events);
  }

  async getTasksByProject(projectId: string) {
    const projectEvents = await this.eventStore.findByAggregateRootId(
      Project,
      projectId,
    );

    const project = Project.fromEvents(projectId, projectEvents);
    const taskIds = project.tasks;
    const tasksEvents = await this.eventStore.findByAggregateRootIds(
      Task,
      taskIds,
    );
    const tasks = taskIds.map((taskId) => {
      const events = tasksEvents[taskId];
      return Task.fromEvents(taskId, events);
    });
    return tasks;
  }

  async getUsersByTask(taskId: string) {
    const eventTask = await this.eventStore.findByAggregateRootId(Task, taskId);
    const task = Task.fromEvents(taskId, eventTask);
    const usersIds = task.assignees;
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
