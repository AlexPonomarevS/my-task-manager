import { Injectable } from '@nestjs/common';
import {
  PublishedDomainEvent,
  DomainEventSubscription,
  OnDomainEvent,
} from '@event-nest/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCreatedEvent } from '../users/events/user-created.event';

@Injectable()
@DomainEventSubscription(UserCreatedEvent)
export class UserEventSubscription implements OnDomainEvent<UserCreatedEvent> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onDomainEvent(
    event: PublishedDomainEvent<UserCreatedEvent>,
  ): Promise<unknown> {
    const user = new User();
    user.name = event.payload.name;
    user.email = event.payload.email;
    user.hashedPassword = event.payload.hashedPassword;

    await this.userRepository.save(user);
    return Promise.resolve();
  }
}
