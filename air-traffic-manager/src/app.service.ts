import { BadRequestException, Injectable } from '@nestjs/common';
import { LoggerService } from './services/logger/logger.service';

const taskList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const btnList = [1, 2, 3, 4, 5];

@Injectable()
export class AppService {
  constructor(
    private loggerService: LoggerService,
  ) {}

  async approveTaskHandler(data: any) {
    await this.loggerService.log('atm_approve_task', 'Получено задание для согласования вылета');
    const result = taskList.find((id) => id === data.id);

    if (result) {
      await this.loggerService.log('atm_approve_task', 'Задача найдена, вылет согласован');

      return {
        success: true,
        message: 'Вылет согласован',
      };
    }

    await this.loggerService.log('atm_approve_task', 'Задача не найдена, вылет не согласован');
    return {
      success: false,
      error: new BadRequestException('Задача не найдена'),
    };
  }

  public async registerBvsHandler(data: any) {
    await this.loggerService.log('atm_register_bvs', 'Получен запрос проверки регистрации БВС и подтверждения вылета');
    const result = btnList.find((id) => id === data.id);

    if (result) {
      await this.loggerService.log('atm_register_bvs', 'Регистрация найдена, вылет подтвержден');

      return {
        success: true,
        message: 'Регистрация выполнена',
      };
    }

    await this.loggerService.log('atm_register_bvs', 'Регистрация не найдена, вылет не подтвержден');

    return {
      success: false,
      error: new BadRequestException('Регистрация не найдена'),
    };
  }

  public async SetInfoGeoHandler(data: any) {
    await this.loggerService.log('atm_set_info_geo', 'Получены координаты дрона, выполняется проверка соответствия заданному пути');
    // Simulator of coords validation
    const isAllowedCoords = !!Math.floor(Math.random() * 2); // 1 or 0 -> true or false

    if (isAllowedCoords) {
      await this.loggerService.log('atm_set_info_geo', 'Координаты соотвествуют заданному пути');
      return {
        success: true,
        message: 'Координаты соотвествуют заданному пути',
      };
    }

    await this.loggerService.log('atm_set_info_geo', 'Координаты не соотвествуют заданному пути, отправлена экстренная команда');
    return {
      success: false,
      message: 'Экстренная команда',
      command: 'Экстренная команда ' + Date.now(),
    };
  }

  public setMissionComplete(data: any) {
    if (data.success === true) {
      this.loggerService.log('atm_set_mission_complete', 'Миссия выполнена');

      return {
        success: true,
        message: 'Миссия выполнена',
      };
    }

    this.loggerService.log('atm_set_mission_complete', 'Миссия не выполнена');
    return {
      success: false,
      error: new BadRequestException('Миссия не выполнена'),
    };
  }
}
