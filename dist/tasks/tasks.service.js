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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@event-nest/core");
const task_aggregate_1 = require("./aggregates/task.aggregate");
const project_aggregate_1 = require("../projects/aggregates/project.aggregate");
const uuid_1 = require("uuid");
const user_aggregate_1 = require("../users/aggregates/user.aggregate");
let TaskService = class TaskService {
    constructor(eventStore) {
        this.eventStore = eventStore;
    }
    async createTask(projectId, name) {
        const projectEvents = await this.eventStore.findByAggregateRootId(project_aggregate_1.Project, projectId);
        const project = project_aggregate_1.Project.fromEvents(projectId, projectEvents);
        const taskId = (0, uuid_1.v4)();
        const task = task_aggregate_1.Task.createNew(taskId, projectId, name);
        const taskWithPublisher = this.eventStore.addPublisher(task);
        await taskWithPublisher.commit();
        project.addTask(taskId);
        const projectWithPublisher = this.eventStore.addPublisher(project);
        await projectWithPublisher.commit();
        return task;
    }
    async updateTaskStatus(id, newStatus) {
        const events = await this.eventStore.findByAggregateRootId(task_aggregate_1.Task, id);
        const task = task_aggregate_1.Task.fromEvents(id, events);
        const taskWithPublisher = this.eventStore.addPublisher(task);
        task.updateStatus(newStatus);
        await taskWithPublisher.commit();
    }
    async completeTask(id) {
        const events = await this.eventStore.findByAggregateRootId(task_aggregate_1.Task, id);
        const task = task_aggregate_1.Task.fromEvents(id, events);
        const taskWithPublisher = this.eventStore.addPublisher(task);
        task.completeTask();
        await taskWithPublisher.commit();
    }
    async addAssignee(taskId, userId, projectId) {
        const projectEvents = await this.eventStore.findByAggregateRootId(project_aggregate_1.Project, projectId);
        const project = project_aggregate_1.Project.fromEvents(projectId, projectEvents);
        if (!project.isMember(userId)) {
            throw new Error('User is not a member of the project');
        }
        const taskEvents = await this.eventStore.findByAggregateRootId(task_aggregate_1.Task, taskId);
        const task = task_aggregate_1.Task.fromEvents(taskId, taskEvents);
        const taskWithPublisher = this.eventStore.addPublisher(task);
        task.addAssignee(userId);
        await taskWithPublisher.commit();
    }
    async getTask(id) {
        const events = await this.eventStore.findByAggregateRootId(task_aggregate_1.Task, id);
        return task_aggregate_1.Task.fromEvents(id, events);
    }
    async getTasksByProject(projectId) {
        const projectEvents = await this.eventStore.findByAggregateRootId(project_aggregate_1.Project, projectId);
        const project = project_aggregate_1.Project.fromEvents(projectId, projectEvents);
        const taskIds = project.tasks;
        const tasksEvents = await this.eventStore.findByAggregateRootIds(task_aggregate_1.Task, taskIds);
        const tasks = taskIds.map((taskId) => {
            const events = tasksEvents[taskId];
            return task_aggregate_1.Task.fromEvents(taskId, events);
        });
        return tasks;
    }
    async getUsersByTask(taskId) {
        const eventTask = await this.eventStore.findByAggregateRootId(task_aggregate_1.Task, taskId);
        const task = task_aggregate_1.Task.fromEvents(taskId, eventTask);
        const usersIds = task.assignees;
        const eventsUsers = await this.eventStore.findByAggregateRootIds(user_aggregate_1.User, usersIds);
        const users = usersIds.map((id) => {
            const events = eventsUsers[id];
            return user_aggregate_1.User.fromEvents(id, events);
        });
        return users;
    }
    async updateTaskName(taskId, newName) {
        const taskEvents = await this.eventStore.findByAggregateRootId(task_aggregate_1.Task, taskId);
        const task = task_aggregate_1.Task.fromEvents(taskId, taskEvents);
        const taskWithPublisher = this.eventStore.addPublisher(task);
        task.updateName(newName);
        await taskWithPublisher.commit();
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.EVENT_STORE)),
    __metadata("design:paramtypes", [Object])
], TaskService);
//# sourceMappingURL=tasks.service.js.map