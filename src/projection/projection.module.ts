import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserEventSubscription } from './user-event-subscription.service';
import { ProjectionController } from './projection.controller';
import { ProjectionService } from './projection.service';
import { ProjectStatus } from './project-status.entity';
import { ProjectStatusEventSubscription } from './project-status-event-subscription.service';
import { ProjectMembers } from './project-members.entity';
import { ProjectMembersEventSubService } from './project-members-event-sub.service';
import { ProjectTasksEventSubService } from './project-tasks-event-sub.service';
import { ProjectTasks } from './project-tasks.entity';
import { Task } from './task.entity';
import { TaskEventSubscription } from './task-event-subscription.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      ProjectStatus,
      ProjectMembers,
      ProjectTasks,
      Task,
    ]),
  ],
  controllers: [ProjectionController],
  providers: [
    ProjectionService,
    UserEventSubscription,
    ProjectStatusEventSubscription,
    ProjectMembersEventSubService,
    ProjectTasksEventSubService,
    TaskEventSubscription,
  ],
})
export class ProjectionModule {}
