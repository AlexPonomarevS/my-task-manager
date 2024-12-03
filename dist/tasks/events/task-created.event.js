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
exports.TaskCreatedEvent = void 0;
const core_1 = require("@event-nest/core");
let TaskCreatedEvent = class TaskCreatedEvent {
    constructor(taskId, projectId, name) {
        this.taskId = taskId;
        this.projectId = projectId;
        this.name = name;
    }
};
exports.TaskCreatedEvent = TaskCreatedEvent;
exports.TaskCreatedEvent = TaskCreatedEvent = __decorate([
    (0, core_1.DomainEvent)('task-created-event'),
    __metadata("design:paramtypes", [String, String, String])
], TaskCreatedEvent);
//# sourceMappingURL=task-created.event.js.map