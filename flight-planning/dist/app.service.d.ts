import { ChooseDroneDto } from './dto/choose-drone.dto';
import { DroneStoreService } from './services/drone-store/drone-store.service';
import { TaskDto } from './dto/task.dto';
import { TaskStoreService } from './services/task-store/task-store.service';
import { ClientKafka } from '@nestjs/microservices';
import { GetInfoDto } from './dto/get-info.dto';
import { LoggerService } from './services/logger/logger.service';
export declare class AppService {
    private readonly atmService;
    private readonly droneService;
    private readonly droneStoreService;
    private readonly taskStoreService;
    private readonly loggerService;
    constructor(atmService: ClientKafka, droneService: ClientKafka, droneStoreService: DroneStoreService, taskStoreService: TaskStoreService, loggerService: LoggerService);
    selectDrone(data: ChooseDroneDto): Promise<{
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
    }>;
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
    finishTask(data: TaskDto): void;
    getInfo(data: GetInfoDto): Promise<void>;
}
