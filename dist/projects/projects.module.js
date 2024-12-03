"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsModule = void 0;
const common_1 = require("@nestjs/common");
const projects_controller_1 = require("./projects.controller");
const projects_service_1 = require("./projects.service");
const tasks_service_1 = require("../tasks/tasks.service");
const typeorm_1 = require("@nestjs/typeorm");
const aggregate_entity_1 = require("../typeORM/aggregate.entity");
let ProjectsModule = class ProjectsModule {
};
exports.ProjectsModule = ProjectsModule;
exports.ProjectsModule = ProjectsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([aggregate_entity_1.Aggregate])],
        controllers: [projects_controller_1.ProjectController],
        providers: [projects_service_1.ProjectService, tasks_service_1.TaskService],
        exports: [projects_service_1.ProjectService, tasks_service_1.TaskService],
    })
], ProjectsModule);
//# sourceMappingURL=projects.module.js.map