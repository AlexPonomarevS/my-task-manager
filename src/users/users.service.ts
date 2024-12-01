import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { EVENT_STORE, EventStore } from '@event-nest/core';
import * as bcrypt from 'bcrypt';
import { User } from './aggregates/user.aggregate';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  private userIndex: Map<string, string>;

  constructor(
    @Inject(EVENT_STORE) private eventStore: EventStore,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {
    this.userIndex = new Map();
  }

  async createUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    const user = User.createNew(userId, name, email, hashedPassword);
    const userWithPublisher = this.eventStore.addPublisher(user);
    await userWithPublisher.commit();

    this.userIndex.set(email, userId);

    return user.id;
  }

  async getUser(id: string) {
    const events = await this.eventStore.findByAggregateRootId(User, id);
    return User.fromEvents(id, events);
  }

  async findByEmail(email: string) {
    const userId = this.userIndex.get(email);
    if (!userId) {
      return null;
    }
    const events = await this.eventStore.findByAggregateRootId(User, userId);
    return User.fromEvents(userId, events);
  }
}
