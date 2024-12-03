import { EventStore } from '@event-nest/core';
import { Task } from './aggregates/task.aggregate';
import { User } from '../users/aggregates/user.aggregate';
export declare class TaskService {
    private eventStore;
    constructor(eventStore: EventStore);
    createTask(projectId: string, name: string): Promise<Task>;
    updateTaskStatus(id: string, newStatus: string): Promise<void>;
    completeTask(id: string): Promise<void>;
    addAssignee(taskId: string, userId: string, projectId: string): Promise<void>;
    getTask(id: string): Promise<Task>;
    getTasksByProject(projectId: string): Promise<Task[]>;
    getUsersByTask(taskId: string): Promise<User[]>;
    updateTaskName(taskId: string, newName: string): Promise<void>;
}
