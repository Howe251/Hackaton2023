import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LoggerService {
  private readonly producer = 'FLIGHT_PLANNING';

  constructor(
    @Inject('LOGGER_SERVICE') private readonly loggerService: ClientKafka,
  ) {
  }

  public log(topic: string, message: any): Promise<void> {
    return firstValueFrom(this.loggerService.emit('logger_log',{ topic, message, producer: this.producer }));
  }
}
