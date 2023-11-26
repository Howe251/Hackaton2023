import { Inject, Injectable } from '@nestjs/common';
import { ChooseDroneDto } from './dto/choose-drone.dto';
import { DroneStoreService } from './services/drone-store/drone-store.service';
import { TaskDto } from './dto/task.dto';
import { TaskStoreService } from './services/task-store/task-store.service';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { GetInfoDto } from './dto/get-info.dto';
import { LoggerService } from './services/logger/logger.service';


@Injectable()
export class AppService {
  constructor(
    @Inject('ATM_SERVICE') private readonly atmService: ClientKafka,
    @Inject('DRONE_SERVICE') private readonly droneService: ClientKafka,
    private readonly droneStoreService: DroneStoreService,
    private readonly taskStoreService: TaskStoreService,
    private readonly loggerService: LoggerService,
  ) {
  }

  public async selectDrone(data: ChooseDroneDto) {
    try {
      await this.loggerService.log('fp_select_drone', 'Получен запрос на выбор Дрона');
      await this.loggerService.log('fp_select_drone', 'Проверка совместимости оператора и дрона');
      const { message, permission } = this.droneStoreService.selectDrone(data.droneId, data.userId);

      await this.loggerService.log('fp_select_drone', 'Разрешение получено, дрон выбран');
      return {
        success: true,
        message: message,
        data: { permission },
      }
    } catch (error) {
      await this.loggerService.log('fp_select_drone', 'Разрешение не получено, дрон не выбран');

      return {
        success: false,
        error,
      }
    }
  }

  public async createTask(data: TaskDto) {
    try {
      await this.loggerService.log('fp_create-task', `Получено новое задание для дрона ${data.droneId}`);
      await this.loggerService.log('fp_create-task', 'Проверка разрешения');
      this.droneStoreService.verifyPermission(data.permission);
      await this.loggerService.log('fp_create-task', 'Разрешение валидно');

      const task = this.taskStoreService.addTasks(data);
      await this.loggerService.log('fp_create-task', 'Отправка задачи в АТМ для првоерки полетного задания');
      const taskApproval = await firstValueFrom(this.atmService.send('atm_approve_task', {
        ...data,
        ...task,
      }));


      if (!taskApproval.success) {
        throw taskApproval.error;
      }

      await this.loggerService.log('fp_create-task', 'Полетное задание согласовано с АТМ');
      await this.loggerService.log('fp_create-task', 'Полетное задание отправлено дрону');
      const droneResponse = await firstValueFrom(this.droneService.send('drone_set_flight_task', {
        ...data,
        ...task,
      }));

      if (!droneResponse.success) {
        throw droneResponse.error;
      }

      await this.loggerService.log('fp_create-task', 'Полетное задание принято дроном');

      return {
        success: true,
        message: 'Task created',
        data: task,
      }
    } catch (error) {
      return {
        success: false,
        error,
      }
    }
  }

  public finishTask(data: TaskDto) {
    this.droneStoreService.storeDrone(data.permission, data.droneId);
    this.taskStoreService.finishTask(data['id']);
    this.loggerService.log('fp_finish_task', `Дрон ${data.droneId} завершил задание ${data['id']} и вернулся на базу`);
  }

  public async getInfo(data: GetInfoDto) {
    try {

    } catch (error) {

    }
  }
}
