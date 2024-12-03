import { AggregateRoot, StoredEvent } from '@event-nest/core';
export declare class Project extends AggregateRoot {
    private name;
    members: string[];
    statuses: string[];
    tasks: string[];
    private constructor();
    static createNew(id: string, name: string, createdBy: string): Project;
    static fromEvents(id: string, events: Array<StoredEvent>): Project;
    addStatus(newStatus: string): void;
    removeStatus(status: string): void;
    isMember(userId: string): boolean;
    addMember(userId: string): void;
    addTask(taskId: string): void;
    private applyProjectCreatedEvent;
    private applyProjectStatusUpdatedEvent;
    private applyTaskAddedToProjectEvent;
    private applyMemberAddedToProjectEvent;
    private applyProjectStatusRemovedEvent;
}
