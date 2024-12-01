import { Module } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { TaskController } from './tasks.controller';

@Module({
  providers: [TaskService],
  controllers: [TaskController],
})
export class TasksModule {}
