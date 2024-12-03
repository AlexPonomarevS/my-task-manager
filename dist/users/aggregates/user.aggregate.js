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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const core_1 = require("@event-nest/core");
const user_created_event_1 = require("../events/user-created.event");
const bcrypt = require("bcrypt");
let User = User_1 = class User extends core_1.AggregateRoot {
    constructor(id) {
        super(id);
    }
    static createNew(id, name, email, hashedPassword) {
        const user = new User_1(id);
        const event = new user_created_event_1.UserCreatedEvent(name, email, hashedPassword);
        user.applyUserCreatedEvent(event);
        user.append(event);
        return user;
    }
    static fromEvents(id, events) {
        const user = new User_1(id);
        user.reconstitute(events);
        return user;
    }
    applyUserCreatedEvent(event) {
        this.name = event.name;
        this.email = event.email;
        this.hashedPassword = event.hashedPassword;
    }
    async checkPassword(password) {
        return await bcrypt.compare(password, this.hashedPassword);
    }
    getPublicProfile() {
        const { hashedPassword, ...publicProfile } = this;
        return publicProfile;
    }
};
exports.User = User;
__decorate([
    (0, core_1.ApplyEvent)(user_created_event_1.UserCreatedEvent),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_created_event_1.UserCreatedEvent]),
    __metadata("design:returntype", void 0)
], User.prototype, "applyUserCreatedEvent", null);
exports.User = User = User_1 = __decorate([
    (0, core_1.AggregateRootName)('User'),
    __metadata("design:paramtypes", [String])
], User);
//# sourceMappingURL=user.aggregate.js.map