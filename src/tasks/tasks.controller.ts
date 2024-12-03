import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from '../common/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Импортируем наш декоратор

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(
      createTaskDto.projectId,
      createTaskDto.name,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: { status: string },
  ) {
    return this.taskService.updateTaskStatus(id, updateStatusDto.status);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/complete')
  async completeTask(@Param('id') id: string) {
    return this.taskService.completeTask(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/assign')
  async addAssignee(
    @Param('id') id: string,
    @Body() assigneeDto: { userId: string; projectId: string },
  ) {
    return this.taskService.addAssignee(
      id,
      assigneeDto.userId,
      assigneeDto.projectId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTask(@Param('id') id: string) {
    return this.taskService.getTask(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':taskId/users')
  async getUsersByTask(@Param('taskId') taskId: string) {
    const users = await this.taskService.getUsersByTask(taskId);
    return users;
  }
}
