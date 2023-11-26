import { Controller, Inject, OnModuleInit, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { ChooseDroneDto } from './dto/choose-drone.dto';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { LoggerService } from './services/logger/logger.service';
import { TaskDto } from './dto/task.dto';

@Controller()
@UseInterceptors(AuthInterceptor)
export class AppController implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientKafka,
    private readonly appService: AppService,
    private readonly loggerService: LoggerService,
  ) {}

  public onModuleInit(): void {
    this.authService.subscribeToResponseOf('auth_verify_token');
  }

  @MessagePattern('test_command')
  testCommandHandler(@Payload() message: any, @Ctx() context: KafkaContext) {
    return this.appService.testCommandHandler(message);
  }

  @MessagePattern('fp_select_drone')
  selectDrone(@Payload() message: ChooseDroneDto) {
    const response = this.appService.selectDrone(message);
    this.loggerService.log('fp_select_drone', response);
    return response;
  }

  @MessagePattern('fp_create-task')
  createTask(@Payload() message: TaskDto) {
    const response = this.appService.createTask(message);
    this.loggerService.log('fp_create-task', response);
    return response;
  }
}
