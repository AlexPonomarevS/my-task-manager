import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ProjectService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TaskService } from '../tasks/tasks.service';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly taskService: TaskService,
  ) {}

  @Post()
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createProject(
      createProjectDto.name,
      createProjectDto.createdBy,
    );
  }

  @Post(':id/status')
  async addStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: { status: string },
  ) {
    return this.projectService.addStatus(id, updateStatusDto.status);
  }

  @Get(':id')
  async getProject(@Param('id') id: string) {
    return this.projectService.getProject(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:userId')
  async getAllProjects(@Param('userId') userId: string) {
    const projects = await this.projectService.getAllProjects(userId);
    return projects;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':projectId/tasks')
  async getTasksByProject(@Param('projectId') projectId: string) {
    const tasks = await this.taskService.getTasksByProject(projectId);
    return tasks;
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/member')
  async addMember(
    @Param('id') projectId: string,
    @Body() body: { userId: string },
  ) {
    return this.projectService.addMember(projectId, body.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':projectId/users')
  async getUsersByProject(@Param('projectId') projectId: string) {
    const users = await this.projectService.getUsersByProject(projectId);
    return users;
  }
}
