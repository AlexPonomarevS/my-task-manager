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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberAddedToProjectEvent = void 0;
const core_1 = require("@event-nest/core");
let MemberAddedToProjectEvent = class MemberAddedToProjectEvent {
    constructor(projectId, userId) {
        this.projectId = projectId;
        this.userId = userId;
    }
};
exports.MemberAddedToProjectEvent = MemberAddedToProjectEvent;
exports.MemberAddedToProjectEvent = MemberAddedToProjectEvent = __decorate([
    (0, core_1.DomainEvent)('member-added-to-project-event'),
    __metadata("design:paramtypes", [String, String])
], MemberAddedToProjectEvent);
//# sourceMappingURL=member-added-to-project.event.js.map