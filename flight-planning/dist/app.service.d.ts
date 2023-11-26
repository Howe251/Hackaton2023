import { ChooseDroneDto } from './dto/choose-drone.dto';
import { DroneStoreService } from './services/drone-store/drone-store.service';
import { TaskDto } from './dto/task.dto';
import { TaskStoreService } from './services/task-store/task-store.service';
import { ClientKafka } from '@nestjs/microservices';
export declare class AppService {
    private readonly atmService;
    private readonly droneStoreService;
    private readonly taskStoreService;
    constructor(atmService: ClientKafka, droneStoreService: DroneStoreService, taskStoreService: TaskStoreService);
    testCommandHandler(data: any): {
        success: boolean;
        message: string;
    };
    selectDrone(data: ChooseDroneDto): {
        success: boolean;
        message: string;
        data: {
            permission: string;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message?: undefined;
        data?: undefined;
    };
    createTask(data: TaskDto): Promise<{
        success: boolean;
        message: string;
        data: import("./models/task.model").TaskModel;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message?: undefined;
        data?: undefined;
    }>;
}
