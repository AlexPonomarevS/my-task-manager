import { Module } from '@nestjs/common';
import { ProjectController } from './projects.controller';
import { ProjectService } from './projects.service';
import { TaskService } from '../tasks/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aggregate } from '../typeORM/aggregate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aggregate])],
  controllers: [ProjectController],
  providers: [ProjectService, TaskService],
  exports: [ProjectService, TaskService],
})
export class ProjectsModule {}
