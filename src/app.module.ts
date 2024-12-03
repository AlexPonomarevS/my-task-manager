import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventNestPostgreSQLModule } from '@event-nest/postgresql';
import { UserModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // тип базы данных
      host: 'localhost', // адрес хоста
      port: 5433, // порт, обычно 5432 для PostgreSQL
      username: 'myuser', // ваше имя пользователя
      password: 'mypassword', // ваш пароль
      database: 'mydatabase', // имя вашей базы данных
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // путь к вашим сущностям
      synchronize: true, // автоматически синхронизировать схему (в разработке)
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
