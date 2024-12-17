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
var Project_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const core_1 = require("@event-nest/core");
const project_created_event_1 = require("../events/project-created.event");
const project_status_updated_event_1 = require("../events/project-status-updated.event");
const task_added_to_project_event_1 = require("../events/task-added-to-project.event");
const member_added_to_project_event_1 = require("../events/member-added-to-project.event");
const project_status_removed_event_1 = require("../events/project-status-removed.event");
let Project = Project_1 = class Project extends core_1.AggregateRoot {
    constructor(id) {
        super(id);
    }
    static createNew(id, name, createdBy) {
        const project = new Project_1(id);
        const event = new project_created_event_1.ProjectCreatedEvent(name, [], ['CREATED']);
        project.applyProjectCreatedEvent(event);
        project.append(event);
        const eventAddMember = new member_added_to_project_event_1.MemberAddedToProjectEvent(id, createdBy);
        project.applyMemberAddedToProjectEvent(eventAddMember);
        return project;
    }
    static fromEvents(id, events) {
        const project = new Project_1(id);
        project.reconstitute(events);
        return project;
    }
    addStatus(newStatus) {
        const event = new project_status_updated_event_1.ProjectStatusUpdatedEvent(this.id, newStatus);
        this.applyProjectStatusUpdatedEvent(event);
        this.append(event);
    }
    removeStatus(status) {
        const event = new project_status_removed_event_1.ProjectStatusRemovedEvent(this.id, status);
        this.applyProjectStatusRemovedEvent(event);
        this.append(event);
    }
    isMember(userId) {
        return this.members.includes(userId);
    }
    addMember(userId) {
        const event = new member_added_to_project_event_1.MemberAddedToProjectEvent(this.id, userId);
        this.applyMemberAddedToProjectEvent(event);
        this.append(event);
    }
    addTask(taskId) {
        const event = new task_added_to_project_event_1.TaskAddedToProjectEvent(this.id, taskId);
        this.applyTaskAddedToProjectEvent(event);
        this.append(event);
    }
    applyProjectCreatedEvent(event) {
        this.name = event.name;
        this.members = event.members;
        this.statuses = event.initialStatus;
        this.tasks = [];
    }
    applyProjectStatusUpdatedEvent(event) {
        this.statuses.push(event.newStatus);
    }
    applyTaskAddedToProjectEvent(event) {
        this.tasks.push(event.taskId);
    }
    applyMemberAddedToProjectEvent(event) {
        this.members.push(event.userId);
    }
    applyProjectStatusRemovedEvent(event) {
        this.statuses = this.statuses.filter((s) => s !== event.status);
    }
};
exports.Project = Project;
__decorate([
    (0, core_1.ApplyEvent)(project_created_event_1.ProjectCreatedEvent),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_created_event_1.ProjectCreatedEvent]),
    __metadata("design:returntype", void 0)
], Project.prototype, "applyProjectCreatedEvent", null);
__decorate([
    (0, core_1.ApplyEvent)(project_status_updated_event_1.ProjectStatusUpdatedEvent),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_status_updated_event_1.ProjectStatusUpdatedEvent]),
    __metadata("design:returntype", void 0)
], Project.prototype, "applyProjectStatusUpdatedEvent", null);
__decorate([
    (0, core_1.ApplyEvent)(task_added_to_project_event_1.TaskAddedToProjectEvent),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_added_to_project_event_1.TaskAddedToProjectEvent]),
    __metadata("design:returntype", void 0)
], Project.prototype, "applyTaskAddedToProjectEvent", null);
__decorate([
    (0, core_1.ApplyEvent)(member_added_to_project_event_1.MemberAddedToProjectEvent),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [member_added_to_project_event_1.MemberAddedToProjectEvent]),
    __metadata("design:returntype", void 0)
], Project.prototype, "applyMemberAddedToProjectEvent", null);
__decorate([
    (0, core_1.ApplyEvent)(project_status_removed_event_1.ProjectStatusRemovedEvent),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_status_removed_event_1.ProjectStatusRemovedEvent]),
    __metadata("design:returntype", void 0)
], Project.prototype, "applyProjectStatusRemovedEvent", null);
exports.Project = Project = Project_1 = __decorate([
    (0, core_1.AggregateRootName)('Project'),
    __metadata("design:paramtypes", [String])
], Project);
//# sourceMappingURL=project.aggregate.js.map