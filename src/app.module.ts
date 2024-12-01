import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventNestPostgreSQLModule } from '@event-nest/postgresql';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    EventNestPostgreSQLModule.forRoot({
      aggregatesTableName: 'aggregates',
      connectionUri: 'postgresql://myuser:mypassword@localhost:5433/mydatabase',
      eventsTableName: 'events',
      schemaName: 'public',
      ensureTablesExist: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
