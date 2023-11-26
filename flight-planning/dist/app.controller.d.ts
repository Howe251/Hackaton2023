import { OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';
import { ChooseDroneDto } from './dto/choose-drone.dto';
import { LoggerService } from './services/logger/logger.service';
import { TaskDto } from './dto/task.dto';
import { GetInfoDto } from './dto/get-info.dto';
export declare class AppController implements OnModuleInit {
    private readonly authService;
    private readonly atmService;
    private readonly droneService;
    private readonly appService;
    private readonly loggerService;
    constructor(authService: ClientKafka, atmService: ClientKafka, droneService: ClientKafka, appService: AppService, loggerService: LoggerService);
    onModuleInit(): void;
    selectDrone(message: ChooseDroneDto): Promise<{
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
    createTask(message: TaskDto): Promise<{
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
    setInfoTelemetry(message: any): Promise<{
        success: boolean;
        message: string;
        command: string;
    }>;
    finishTask(message: TaskDto): void;
    getInfo(message: GetInfoDto): Promise<void>;
}
