import { EventStore } from '@event-nest/core';
import { User } from './aggregates/user.aggregate';
import { AuthService } from '../auth/auth.service';
import { Aggregate } from '../typeORM/aggregate.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly aggregateRepository;
    private eventStore;
    private authService;
    constructor(aggregateRepository: Repository<Aggregate>, eventStore: EventStore, authService: AuthService);
    createUser(name: string, email: string, password: string): Promise<string>;
    getUser(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
}
