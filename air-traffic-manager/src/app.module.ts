import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoggerService } from './services/logger/logger.service';
import { AuthInterceptor } from './interceptor/auth/auth.interceptor';

@Module({
  imports: [
    ClientsModule.register([
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
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {}
