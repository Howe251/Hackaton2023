import { Inject, Injectable } from '@nestjs/common';
import { ChooseDroneDto } from './dto/choose-drone.dto';
import { DroneStoreService } from './services/drone-store/drone-store.service';
import { TaskDto } from './dto/task.dto';
import { TaskStoreService } from './services/task-store/task-store.service';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class AppService {
  constructor(
    @Inject('ATM_SERVICE') private readonly atmService: ClientKafka,
    private readonly droneStoreService: DroneStoreService,
    private readonly taskStoreService: TaskStoreService,
  ) {
  }

  public testCommandHandler(data: any) {
    return { success: true, message: `${data.command} received` };
  }

  public selectDrone(data: ChooseDroneDto) {
    try {
      const { message, permission } = this.droneStoreService.selectDrone(data.droneId, data.userId);

      return {
        success: true,
        message: message,
        data: { permission },
      }
    } catch (error) {
      return {
        success: false,
        error,
      }
    }
  }

  public async createTask(data: TaskDto) {
    try {
      this.droneStoreService.verifyPermission(data.permission);

      const task = this.taskStoreService.addTasks(data);
      console.log(task);
      const atmResponse = await firstValueFrom(this.atmService.send('atm_set_task', {
        id: task.id,
        accessToken: data.accessToken,
      }));

      console.log(atmResponse);

      if (!atmResponse.success) {
        throw atmResponse.error;
      }

      // TODO: send task to drone

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
}
