import { Injectable, Inject } from '@nestjs/common';
import { EVENT_STORE, EventStore } from '@event-nest/core';
import * as bcrypt from 'bcrypt';
import { User } from './aggregates/user.aggregate';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(@Inject(EVENT_STORE) private eventStore: EventStore) {}

  async createUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10); // Хешируем пароль
    const user = User.createNew(uuidv4(), name, email, hashedPassword); // Используем UUID для создания уникального идентификатора
    const userWithPublisher = this.eventStore.addPublisher(user);
    await userWithPublisher.commit();
    return user.id;
  }

  async getUser(id: string) {
    const events = await this.eventStore.findByAggregateRootId(User, id);
    return User.fromEvents(id, events);
  }
}
