import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { EVENT_STORE, EventStore } from '@event-nest/core';
import * as bcrypt from 'bcrypt';
import { User } from './aggregates/user.aggregate';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from '../auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Aggregate } from '../typeORM/aggregate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Aggregate)
    private readonly aggregateRepository: Repository<Aggregate>,
    @Inject(EVENT_STORE) private eventStore: EventStore,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async createUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    const user = User.createNew(userId, name, email, hashedPassword);
    const userWithPublisher = this.eventStore.addPublisher(user);
    await userWithPublisher.commit();

    return user.id;
  }

  async getUser(id: string) {
    const events = await this.eventStore.findByAggregateRootId(User, id);
    return User.fromEvents(id, events);
  }

  async findByEmail(email: string) {
    const aggregates = await this.aggregateRepository.find();
    const aggregatesIds = aggregates.map((aggregate) => aggregate.id);
    const usersEvents = await this.eventStore.findByAggregateRootIds(
      User,
      aggregatesIds,
    );
    const users = aggregatesIds
      .map((id) => {
        const events = usersEvents[id];
        if (events) {
          return User.fromEvents(id, events);
        } else {
          return null;
        }
      })
      .filter((user) => user !== null);
    users.forEach((user) => {
      console.log(user.email);
    });
    const foundUser = users.find((user: User) => user.email === email);
    return foundUser || null;
  }
}
