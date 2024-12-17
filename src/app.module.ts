import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventNestPostgreSQLModule } from '@event-nest/postgresql';
import { UserModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectionModule } from './projection/projection.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'myuser',
      password: 'mypassword',
      database: 'mydatabase',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
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
    ProjectionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
