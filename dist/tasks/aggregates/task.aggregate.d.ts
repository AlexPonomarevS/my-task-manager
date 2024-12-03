import { AggregateRoot, StoredEvent } from '@event-nest/core';
export declare class Task extends AggregateRoot {
    private name;
    private status;
    private projectId;
    private completed;
    assignees: string[];
    private constructor();
    static createNew(id: string, projectId: string, name: string): Task;
    static fromEvents(id: string, events: Array<StoredEvent>): Task;
    updateStatus(newStatus: string): void;
    completeTask(): void;
    addAssignee(userId: string): void;
    updateName(newName: string): void;
    private applyTaskCreatedEvent;
    private applyTaskStatusUpdatedEvent;
    private applyTaskCompletedEvent;
    private applyAssigneeAddedEvent;
    private applyTaskNameUpdatedEvent;
}
