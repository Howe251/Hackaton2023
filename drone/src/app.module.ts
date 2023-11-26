import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoggerService } from './services/logger/logger.service';
import { GpsService } from './services/gps/gps.service';

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
        name: 'AIR_TRAFFIC_MANAGER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'air-traffic-manager',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'air-traffic-manager-consumer' + Math.random(),
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
        name: 'FLIGHT_PLANNING_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'flight-planning',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'flight-planning-consumer' + Math.random(),
          },
        },
      }
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService, GpsService],
})
export class AppModule {}
