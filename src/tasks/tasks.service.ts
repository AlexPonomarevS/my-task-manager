import { Injectable, Inject } from '@nestjs/common';
import { EVENT_STORE, EventStore } from '@event-nest/core';
import { Task } from './aggregates/task.aggregate';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskService {
  constructor(@Inject(EVENT_STORE) private eventStore: EventStore) {}

  async createTask(projectId: string, name: string) {
    const task = Task.createNew(uuidv4(), projectId, name); // Используем UUID для создания уникального идентификатора
    const taskWithPublisher = this.eventStore.addPublisher(task);
    await taskWithPublisher.commit();
    return task.id;
  }

  async updateTaskStatus(id: string, newStatus: string) {
    const events = await this.eventStore.findByAggregateRootId(Task, id);
    const task = Task.fromEvents(id, events);
    const taskWithPublisher = this.eventStore.addPublisher(task);
    task.updateStatus(newStatus);
    await taskWithPublisher.commit();
  }

  async getTask(id: string) {
    const events = await this.eventStore.findByAggregateRootId(Task, id);
    return Task.fromEvents(id, events);
  }
}
