import { Injectable } from '@nestjs/common';
import { ChooseDroneDto } from './dto/choose-drone.dto';
import { DroneStoreService } from './services/drone-store/drone-store.service';
import { TaskDto } from './dto/task.dto';
import { TaskStoreService } from './services/task-store/task-store.service';


@Injectable()
export class AppService {
  constructor(
    private readonly droneStoreService: DroneStoreService,
    private readonly taskStoreService: TaskStoreService,
  ) {
  }

  public testCommandHandler(data: any) {
    return { success: true, message: `${data.command} received` };
  }

  public selectDrone(data: ChooseDroneDto) {
    return this.droneStoreService.selectDrone(data.droneId, data.userId);
  }

  public createTask(data: TaskDto) {
    try {
      const task = this.taskStoreService.addTasks(data);
      // TODO: send task to air traffic manager
      return {
        success: true,
        message: 'Task created',
        data: task,
      }
    } catch (e) {
      return {
        success: false,
        error: e,
      }
    }
  }
}
