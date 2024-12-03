import { AggregateRoot, StoredEvent } from '@event-nest/core';
export declare class User extends AggregateRoot {
    private name;
    email: string;
    private hashedPassword;
    private constructor();
    static createNew(id: string, name: string, email: string, hashedPassword: string): User;
    static fromEvents(id: string, events: Array<StoredEvent>): User;
    private applyUserCreatedEvent;
    checkPassword(password: string): Promise<boolean>;
    getPublicProfile(): Omit<this, "hashedPassword" | "checkPassword" | "getPublicProfile" | "appendedEvents" | "id" | "logger" | "version" | "append" | "commit" | "publish" | "reconstitute" | "resolveVersion">;
}
