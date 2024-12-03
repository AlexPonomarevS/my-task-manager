import { ProjectService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { TaskService } from '../tasks/tasks.service';
export declare class ProjectController {
    private readonly projectService;
    private readonly taskService;
    constructor(projectService: ProjectService, taskService: TaskService);
    createProject(createProjectDto: CreateProjectDto): Promise<string>;
    addStatus(id: string, updateStatusDto: {
        status: string;
    }): Promise<void>;
    getProject(id: string): Promise<import("./aggregates/project.aggregate").Project>;
    getAllProjects(userId: string): Promise<import("./aggregates/project.aggregate").Project[]>;
    getTasksByProject(projectId: string): Promise<import("../tasks/aggregates/task.aggregate").Task[]>;
    addMember(projectId: string, body: {
        userId: string;
    }): Promise<void>;
    getUsersByProject(projectId: string): Promise<import("../users/aggregates/user.aggregate").User[]>;
    removeStatus(id: string, removeStatusDto: {
        status: string;
    }): Promise<void>;
}
