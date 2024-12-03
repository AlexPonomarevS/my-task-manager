"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@event-nest/core");
const bcrypt = require("bcrypt");
const user_aggregate_1 = require("./aggregates/user.aggregate");
const uuid_1 = require("uuid");
const auth_service_1 = require("../auth/auth.service");
const typeorm_1 = require("@nestjs/typeorm");
const aggregate_entity_1 = require("../typeORM/aggregate.entity");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    constructor(aggregateRepository, eventStore, authService) {
        this.aggregateRepository = aggregateRepository;
        this.eventStore = eventStore;
        this.authService = authService;
    }
    async createUser(name, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = (0, uuid_1.v4)();
        const user = user_aggregate_1.User.createNew(userId, name, email, hashedPassword);
        const userWithPublisher = this.eventStore.addPublisher(user);
        await userWithPublisher.commit();
        return user.id;
    }
    async getUser(id) {
        const events = await this.eventStore.findByAggregateRootId(user_aggregate_1.User, id);
        return user_aggregate_1.User.fromEvents(id, events);
    }
    async findByEmail(email) {
        const aggregates = await this.aggregateRepository.find();
        const aggregatesIds = aggregates.map((aggregate) => aggregate.id);
        const usersEvents = await this.eventStore.findByAggregateRootIds(user_aggregate_1.User, aggregatesIds);
        const users = aggregatesIds
            .map((id) => {
            const events = usersEvents[id];
            if (events) {
                return user_aggregate_1.User.fromEvents(id, events);
            }
            else {
                return null;
            }
        })
            .filter((user) => user !== null);
        users.forEach((user) => {
            console.log(user.email);
        });
        const foundUser = users.find((user) => user.email === email);
        return foundUser || null;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(aggregate_entity_1.Aggregate)),
    __param(1, (0, common_1.Inject)(core_1.EVENT_STORE)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object, auth_service_1.AuthService])
], UserService);
//# sourceMappingURL=users.service.js.map