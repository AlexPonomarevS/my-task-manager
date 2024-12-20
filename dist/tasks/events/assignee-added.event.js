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
exports.AssigneeAddedEvent = void 0;
const core_1 = require("@event-nest/core");
let AssigneeAddedEvent = class AssigneeAddedEvent {
    constructor(taskId, userId) {
        this.taskId = taskId;
        this.userId = userId;
    }
};
exports.AssigneeAddedEvent = AssigneeAddedEvent;
exports.AssigneeAddedEvent = AssigneeAddedEvent = __decorate([
    (0, core_1.DomainEvent)('assignee-added-event'),
    __metadata("design:paramtypes", [String, String])
], AssigneeAddedEvent);
//# sourceMappingURL=assignee-added.event.js.map