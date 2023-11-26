import { Inject, Injectable } from '@nestjs/common';
import { TestCommandDto } from './test-command.dto';
import { ClientKafka } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { CreateDroneDto } from './dto/create-drone.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetInfoDto } from './dto/get-info.dto';
import { LoggerService } from './services/logger/logger.service';

@Injectable()
export class AppService {
  constructor(
    @Inject('FLIGHT_PLANNING_SERVICE') private readonly flightPlanningService: ClientKafka,
    @Inject('AUTH_SERVICE') private readonly authService: ClientKafka,
    private loggerService: LoggerService,
  ) {}

  public testCommand(data: TestCommandDto) {
    return this.flightPlanningService.send(
      'test_command',
      data,
    );
  }

  public login(data: LoginDto) {
    return this.authService.send('auth_login', data);
  }

  public selectDrone(data: CreateDroneDto) {
    this.loggerService.log('fp_select_drone', 'Отправлен запрос на выбор Дрона');
    return this.flightPlanningService.send('fp_select_drone', data);
  }

  public createTask(data: CreateTaskDto) {
    this.loggerService.log('fp_create-task', 'Отправлено новое задание');
    return this.flightPlanningService.send('fp_create-task', data);
  }

  public getInfo(data: GetInfoDto) {
    return this.flightPlanningService.send('fp_get_info', data);
  }
}
