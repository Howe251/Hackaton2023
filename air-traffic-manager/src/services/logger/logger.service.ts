import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class LoggerService {
  private readonly producer = 'AIR_TRAFFIC_MANAGER';

  constructor(
    @Inject('LOGGER_SERVICE') private readonly loggerService: ClientKafka,
  ) {
  }

  public log(topic: string, message: any): void {
    this.loggerService.emit('logger_log',{ topic, message, producer: this.producer });
  }
}
