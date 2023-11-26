import { ChooseDroneDto } from './dto/choose-drone.dto';
import { DroneStoreService } from './services/drone-store/drone-store.service';
import { TaskDto } from './dto/task.dto';
import { TaskStoreService } from './services/task-store/task-store.service';
export declare class AppService {
    private readonly droneStoreService;
    private readonly taskStoreService;
    constructor(droneStoreService: DroneStoreService, taskStoreService: TaskStoreService);
    testCommandHandler(data: any): {
        success: boolean;
        message: string;
    };
    selectDrone(data: ChooseDroneDto): {
        success: boolean;
        error: import("@nestjs/common").BadRequestException;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        error?: undefined;
    };
    createTask(data: TaskDto): {
        success: boolean;
        message: string;
        data: TaskDto;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message?: undefined;
        data?: undefined;
    };
}
