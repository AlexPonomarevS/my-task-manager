import {
  AggregateRoot,
  AggregateRootName,
  ApplyEvent,
  StoredEvent,
} from '@event-nest/core';
import { UserCreatedEvent } from '../events/user-created.event';
import * as bcrypt from 'bcrypt';

@AggregateRootName('User')
export class User extends AggregateRoot {
  private name: string;
  private email: string;
  private hashedPassword: string;

  private constructor(id: string) {
    super(id);
  }

  public static createNew(
    id: string,
    name: string,
    email: string,
    hashedPassword: string,
  ): User {
    const user = new User(id);
    const event = new UserCreatedEvent(name, email, hashedPassword);
    user.applyUserCreatedEvent(event);
    user.append(event);
    return user;
  }

  public static fromEvents(id: string, events: Array<StoredEvent>): User {
    const user = new User(id);
    user.reconstitute(events);
    return user;
  }

  @ApplyEvent(UserCreatedEvent)
  private applyUserCreatedEvent(event: UserCreatedEvent) {
    this.name = event.name;
    this.email = event.email;
    this.hashedPassword = event.hashedPassword;
  }

  public async checkPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.hashedPassword);
  }
  public getPublicProfile() {
    const { hashedPassword, ...publicProfile } = this;
    return publicProfile;
  }
}
