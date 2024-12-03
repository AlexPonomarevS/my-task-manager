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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@event-nest/core");
const project_aggregate_1 = require("./aggregates/project.aggregate");
const uuid_1 = require("uuid");
const typeorm_1 = require("@nestjs/typeorm");
const aggregate_entity_1 = require("../typeORM/aggregate.entity");
const typeorm_2 = require("typeorm");
const user_aggregate_1 = require("../users/aggregates/user.aggregate");
let ProjectService = class ProjectService {
    constructor(aggregateRepository, eventStore) {
        this.aggregateRepository = aggregateRepository;
        this.eventStore = eventStore;
    }
    async createProject(name, createdBy) {
        const projectId = (0, uuid_1.v4)();
        const project = project_aggregate_1.Project.createNew(projectId, name, createdBy);
        const projectWithPublisher = this.eventStore.addPublisher(project);
        await projectWithPublisher.commit();
        return project.id;
    }
    async getAllProjects(userId) {
        const aggregates = await this.aggregateRepository.find();
        const aggregatesIds = aggregates.map((aggregate) => aggregate.id);
        const projectsEvents = await this.eventStore.findByAggregateRootIds(project_aggregate_1.Project, aggregatesIds);
        const projects = aggregatesIds
            .map((id) => {
            const events = projectsEvents[id];
            if (events) {
                return project_aggregate_1.Project.fromEvents(id, events);
            }
            else {
                return null;
            }
        })
            .filter((project) => project !== null && project.members.includes(userId));
        return projects;
    }
    async getProject(id) {
        const events = await this.eventStore.findByAggregateRootId(project_aggregate_1.Project, id);
        return project_aggregate_1.Project.fromEvents(id, events);
    }
    async addStatus(projectId, newStatus) {
        const events = await this.eventStore.findByAggregateRootId(project_aggregate_1.Project, projectId);
        const project = project_aggregate_1.Project.fromEvents(projectId, events);
        const projectWithPublisher = this.eventStore.addPublisher(project);
        project.addStatus(newStatus);
        await projectWithPublisher.commit();
    }
    async addMember(projectId, userId) {
        const events = await this.eventStore.findByAggregateRootId(project_aggregate_1.Project, projectId);
        const project = project_aggregate_1.Project.fromEvents(projectId, events);
        const projectWithPublisher = this.eventStore.addPublisher(project);
        project.addMember(userId);
        await projectWithPublisher.commit();
    }
    async getUsersByProject(projectId) {
        const eventProject = await this.eventStore.findByAggregateRootId(project_aggregate_1.Project, projectId);
        const project = project_aggregate_1.Project.fromEvents(projectId, eventProject);
        const usersIds = project.members;
        const eventsUsers = await this.eventStore.findByAggregateRootIds(user_aggregate_1.User, usersIds);
        const users = usersIds.map((id) => {
            const events = eventsUsers[id];
            return user_aggregate_1.User.fromEvents(id, events);
        });
        return users;
    }
    async removeStatus(projectId, status) {
        const events = await this.eventStore.findByAggregateRootId(project_aggregate_1.Project, projectId);
        const project = project_aggregate_1.Project.fromEvents(projectId, events);
        const projectWithPublisher = this.eventStore.addPublisher(project);
        project.removeStatus(status);
        await projectWithPublisher.commit();
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(aggregate_entity_1.Aggregate)),
    __param(1, (0, common_1.Inject)(core_1.EVENT_STORE)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], ProjectService);
//# sourceMappingURL=projects.service.js.map