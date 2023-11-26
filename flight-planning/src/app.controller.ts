import { Controller, Inject, OnModuleInit, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { ChooseDroneDto } from './dto/choose-drone.dto';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { LoggerService } from './services/logger/logger.service';
import { TaskDto } from './dto/task.dto';
import { GetInfoDto } from './dto/get-info.dto';

@Controller()
@UseInterceptors(AuthInterceptor)
export class AppController implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientKafka,
    @Inject('ATM_SERVICE') private readonly atmService: ClientKafka,
    @Inject('DRONE_SERVICE') private readonly droneService: ClientKafka,
    private readonly appService: AppService,
    private readonly loggerService: LoggerService,
  ) {}

  public onModuleInit(): void {
    this.authService.subscribeToResponseOf('auth_verify_token');
    this.atmService.subscribeToResponseOf('atm_approve_task');
    this.droneService.subscribeToResponseOf('drone_set_flight_task');
  }

  @MessagePattern('fp_select_drone')
  async selectDrone(@Payload() message: ChooseDroneDto) {
    const response = await this.appService.selectDrone(message);
    await this.loggerService.log('fp_select_drone', response);
    return response;
  }

  @MessagePattern('fp_create-task')
  async createTask(@Payload() message: TaskDto) {
    const response = await this.appService.createTask(message);
    this.loggerService.log('fp_create-task', response);
    return response;
  }

  @MessagePattern('fp_set_info_telemetry')
  async setInfoTelemetry(@Payload() message: any) {
    await this.loggerService.log('fp_set_info_telemetry', 'Получена телеметрия');
    // Simulator of telemetry validation
    const isNeedToSendCommand = !!Math.floor(Math.random() * 2); // 1 or 0 -> true or false

    if (isNeedToSendCommand) {
      await this.loggerService.log('fp_set_info_telemetry', 'Отправляю управляющую команду на основе телеметрии');
    }

    return {
      success: true,
      message: 'Telemetry received',
      command: isNeedToSendCommand ? 'Управляющая команда ' + Date.now() : '',
    }
  }

  @MessagePattern('fp_finish_task')
  finishTask(@Payload() message: TaskDto) {
    this.appService.finishTask(message);
  }

  @MessagePattern('fp_get_info')
  async getInfo(@Payload() message: GetInfoDto) {
    const response = await this.appService.getInfo(message);
    this.loggerService.log('fp_get_info', response);
    return response;
  }
}
