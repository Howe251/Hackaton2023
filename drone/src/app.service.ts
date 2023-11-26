import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { TelemetryDto } from './dto/telemetry.dto';
import { FlightTaskDto } from './dto/flightTaskDto';
import { firstValueFrom, interval, take } from 'rxjs';
import { GpsService } from './services/gps/gps.service';
import { DroneModel } from './models/drone.model';
import { LoggerService } from './services/logger/logger.service';
import { DroneCommandModel } from './models/drone-command.model';

@Injectable()
export class AppService {

  constructor(
    @Inject('AIR_TRAFFIC_MANAGER_SERVICE') private readonly ATMService: ClientKafka,
    @Inject('FLIGHT_PLANNING_SERVICE') private readonly flightPlanningService: ClientKafka,
    private readonly gpsService: GpsService,
    private readonly loggerService: LoggerService,
  ) {
  }

  public async setFlightTask(task: FlightTaskDto) {
    try {
      await this.loggerService.log('drone_set_flight_task', 'Получено новое задание');
      await this.loggerService.log('drone_set_flight_task', 'Регистрация БВС в АТМ');
      const registration = await this.registerBVSInATM(task);

      if (!registration.success) {
        throw registration.error;
      }

      await this.loggerService.log('drone_set_flight_task', 'Получено подтверждение вылета');

      await this.loggerService.log('drone_set_flight_task', 'Запуск полета');
      this.processTask(task);

      return {
        success: true,
        message: "Flight approved. Starting flight",
      };
    } catch (error) {
      return { success: false, error };
    }
  }

  public async registerBVSInATM(task: FlightTaskDto) {
    return firstValueFrom(this.ATMService.send("atm_register_bvs", task));
  }

  private processTask(task: FlightTaskDto) {
    const drone = new DroneModel(this.loggerService);

    interval(1000)
      .pipe(
        take(5)
      )
      .subscribe(async (count) => {
        await this.loggerService.log('drone_set_flight_task', `Отправляю гео и телеметрию`);
        await this.sendGeo(drone, task.accessToken);
        await this.sendTelemetry(drone, task.accessToken);

        if (count === 4) {
          setTimeout(async () => {
            await this.loggerService.log('drone_set_flight_task', `Завершаю полет`);
            this.sendFinishTask(task, task.accessToken)
          }, 2000);
        }
      });
  }

  private async sendGeo(drone: DroneModel, accessToken: string): Promise<void> {
    const geo = this.gpsService.getGPSPos();
    const status = await firstValueFrom(this.ATMService.send('atm_set_info_geo', {
      ...geo,
      accessToken
    }));

    if (status.command) {
      await this.loggerService.log('drone_set_flight_task', `Получена экстренная команда "${status.command}"`);
      const emergencyCommand = new DroneCommandModel(1, status.command);
      drone.executeCommand(emergencyCommand);
    }
  }

  private async sendTelemetry(drone: DroneModel, accessToken: string): Promise<void> {
    const telemetry = new TelemetryDto();
    telemetry.speed = Math.random() * 100;
    telemetry.distanceToHome = Math.random() * 1000;
    telemetry.position = this.gpsService.getGPSPos();

    const status = await firstValueFrom(this.flightPlanningService.send('fp_set_info_telemetry', {
      ...telemetry,
      accessToken
    }));

    if (status.command) {
      await this.loggerService.log('drone_set_flight_task', `Получена управляющая команда "${status.command}"`);
      const regularCommand = new DroneCommandModel(0, status.command);
      drone.executeCommand(regularCommand);
    }
  }

  private sendFinishTask(task: FlightTaskDto, accessToken: string): void {
    this.flightPlanningService.emit('fp_finish_task', {
      ...task,
      accessToken
    });
  }
}
