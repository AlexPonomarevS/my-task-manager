import { EventStore } from '@event-nest/core';
import { Project } from './aggregates/project.aggregate';
import { Aggregate } from '../typeORM/aggregate.entity';
import { Repository } from 'typeorm';
import { User } from '../users/aggregates/user.aggregate';
export declare class ProjectService {
    private readonly aggregateRepository;
    private eventStore;
    constructor(aggregateRepository: Repository<Aggregate>, eventStore: EventStore);
    createProject(name: string, createdBy: string): Promise<string>;
    getAllProjects(userId: string): Promise<Project[]>;
    getProject(id: string): Promise<Project>;
    addStatus(projectId: string, newStatus: string): Promise<void>;
    addMember(projectId: string, userId: string): Promise<void>;
    getUsersByProject(projectId: string): Promise<User[]>;
    removeStatus(projectId: string, status: string): Promise<void>;
}
