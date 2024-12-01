import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventNestPostgreSQLModule } from '@event-nest/postgresql';
import { UserModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    EventNestPostgreSQLModule.forRoot({
      aggregatesTableName: 'aggregates',
      connectionUri: 'postgresql://myuser:mypassword@localhost:5433/mydatabase',
      eventsTableName: 'events',
      schemaName: 'public',
      ensureTablesExist: true,
    }),
    UserModule,
    ProjectsModule,
    TasksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
