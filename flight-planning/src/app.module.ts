import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DroneStoreService } from './services/drone-store/drone-store.service';
import { LoggerService } from './services/logger/logger.service';
import { TaskStoreService } from './services/task-store/task-store.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'auth-consumer' + Math.random(),
          },
        },
      },
      {
        name: 'LOGGER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'logger',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'logger-consumer' + Math.random(),
          },
        },
      },
      {
        name: 'ATM_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'atm',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'air-traffic-manager-consumer' + Math.random(),
          },
        },
      },
      {
        name: 'DRONE_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'drone',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'drone-consumer-consumer' + Math.random(),
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, DroneStoreService, LoggerService, TaskStoreService],
})
export class AppModule {}
