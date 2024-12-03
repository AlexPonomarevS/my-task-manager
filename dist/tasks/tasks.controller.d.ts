import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    createTask(createTaskDto: CreateTaskDto): Promise<import("./aggregates/task.aggregate").Task>;
    updateTaskStatus(id: string, updateStatusDto: {
        status: string;
    }): Promise<void>;
    completeTask(id: string): Promise<void>;
    addAssignee(id: string, assigneeDto: {
        userId: string;
        projectId: string;
    }): Promise<void>;
    getTask(id: string): Promise<import("./aggregates/task.aggregate").Task>;
    getUsersByTask(taskId: string): Promise<import("../users/aggregates/user.aggregate").User[]>;
    updateTaskName(taskId: string, body: {
        newName: string;
    }): Promise<void>;
}
