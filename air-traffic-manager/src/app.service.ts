import { BadRequestException, Injectable } from '@nestjs/common';

const taskList = [1, 2, 3, 4];
const btnList = ['213821ghdhdhq', '12312dewj9dfw', 'test'];
const xСoordinates = [1, 2, 3, 4, 4, 6, 6, 7, 8];
const yCoordinates = [0, 1, 3, 4, 5, 5, 6, 6, 7, 77, 7, 4, 4];

@Injectable()
export class AppService {
  constructor() {}

  setTaskHandler(data: any) {
    const result = taskList.find((id) => id === data.id);

    if (result) {
      console.log('Вылет согласован');
      return {
        success: true,
        message: 'Вылет согласован',
      };
    }

    console.log('Задача не найдена');
    return {
      success: false,
      error: new BadRequestException('Задача не найдена'),
    };
  }

  registerBvsHandler(data: any) {
    const result = btnList.find((id) => id === data.id);

    if (result) {
      console.log('Регистрация выполнена');
      return {
        success: true,
        message: 'Регистрация выполнена',
      };
    }

    console.log('Регистрация не найдена');
    return {
      success: false,
      error: new BadRequestException('Регистрация не найдена'),
    };
  }

  SetInfoGeoHandler(data: any) {
    const xResult = xСoordinates.find((id) => id === data.id);
    const yResult = yCoordinates.find((id) => id === data.id);

    if (xResult && yResult) {
      console.log('Координаты соотвествуют заданному пути');
      return {
        success: true,
        message: 'Координаты соотвествуют заданному пути',
      };
    }

    console.log('Экстренная команда');
    return {
      success: false,
      message: new BadRequestException('Экстренная команда'),
    };
  }

  setMissionComplete(data: any) {
    if (data.success === true) {
      console.log('Миссия выполнена.');

      return {
        success: true,
        message: 'Миссия выполнена',
      };
    }

    console.log('Миссия не выполнена.');
    return {
      success: false,
      error: new BadRequestException('Миссия не выполнена'),
    };
  }
}
