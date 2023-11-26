import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoggerDto } from './dto/logger.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('logger_log')
  log(@Payload() data: LoggerDto) {
    this.appService.log(data);
  }
}
