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
var Task_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const core_1 = require("@event-nest/core");
const task_created_event_1 = require("../events/task-created.event");
const task_status_updated_event_1 = require("../events/task-status-updated.event");
const task_completed_event_1 = require("../events/task-completed.event");
const assignee_added_event_1 = require("../events/assignee-added.event");
const task_name_updated_event_1 = require("../events/task-name-updated.event");
let Task = Task_1 = class Task extends core_1.AggregateRoot {
    constructor(id) {
        super(id);
    }
    static createNew(id, projectId, name) {
        const task = new Task_1(id);
        const event = new task_created_event_1.TaskCreatedEvent(id, projectId, name);
        task.applyTaskCreatedEvent(event);
        task.append(event);
        return task;
    }
    static fromEvents(id, events) {
        const task = new Task_1(id);
        task.reconstitute(events);
        return task;
    }
    updateStatus(newStatus) {
        const event = new task_status_updated_event_1.TaskStatusUpdatedEvent(this.id, newStatus);
        this.applyTaskStatusUpdatedEvent(event);
        this.append(event);
    }
    completeTask() {
        const event = new task_completed_event_1.TaskCompletedEvent(this.id, !this.completed);
        this.applyTaskCompletedEvent(event);
        this.append(event);
    }
    addAssignee(userId) {
        const event = new assignee_added_event_1.AssigneeAddedEvent(this.id, userId);
        this.applyAssigneeAddedEvent(event);
        this.append(event);
    }
    updateName(newName) {
        const event = new task_name_updated_event_1.TaskNameUpdatedEvent(this.id, newName);
        this.applyTaskNameUpdatedEvent(event);
        this.append(event);
    }
    applyTaskCreatedEvent(event) {
        this.name = event.name;
        this.status = 'CREATED';
        this.projectId = event.projectId;
        this.completed = false;
        this.assignees = [];
    }
    applyTaskStatusUpdatedEvent(event) {
        this.status = event.newStatus;
    }
    applyTaskCompletedEvent(event) {
        this.completed = event.completed;
    }
    applyAssigneeAddedEvent(event) {
        this.assignees.push(event.userId);
    }
    applyTaskNameUpdatedEvent(event) {
        this.name = event.newName;
    }
};
exports.Task = Task;
__decorate([
    (0, core_1.ApplyEvent)(task_created_event_1.TaskCreatedEvent),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_created_event_1.TaskCreatedEvent]),
    __metadata("design:returntype", void 0)
], Task.prototype, "applyTaskCreatedEvent", null);
__decorate([
    (0, core_1.ApplyEvent)(task_status_updated_event_1.TaskStatusUpdatedEvent),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_status_updated_event_1.TaskStatusUpdatedEvent]),
    __metadata("design:returntype", void 0)
], Task.prototype, "applyTaskStatusUpdatedEvent", null);
__decorate([
    (0, core_1.ApplyEvent)(task_completed_event_1.TaskCompletedEvent),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_completed_event_1.TaskCompletedEvent]),
    __metadata("design:returntype", void 0)
], Task.prototype, "applyTaskCompletedEvent", null);
__decorate([
    (0, core_1.ApplyEvent)(assignee_added_event_1.AssigneeAddedEvent),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assignee_added_event_1.AssigneeAddedEvent]),
    __metadata("design:returntype", void 0)
], Task.prototype, "applyAssigneeAddedEvent", null);
__decorate([
    (0, core_1.ApplyEvent)(task_name_updated_event_1.TaskNameUpdatedEvent),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_name_updated_event_1.TaskNameUpdatedEvent]),
    __metadata("design:returntype", void 0)
], Task.prototype, "applyTaskNameUpdatedEvent", null);
exports.Task = Task = Task_1 = __decorate([
    (0, core_1.AggregateRootName)('Task'),
    __metadata("design:paramtypes", [String])
], Task);
//# sourceMappingURL=task.aggregate.js.map