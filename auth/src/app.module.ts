import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoggerService } from './services/logger/logger.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
    ClientsModule.register([
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
    ])
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {}
