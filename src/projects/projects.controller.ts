import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ProjectService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

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
}
