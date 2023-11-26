import { OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, KafkaContext } from '@nestjs/microservices';
import { ChooseDroneDto } from './dto/choose-drone.dto';
import { LoggerService } from './services/logger/logger.service';
import { TaskDto } from './dto/task.dto';
export declare class AppController implements OnModuleInit {
    private readonly authService;
    private readonly atmService;
    private readonly appService;
    private readonly loggerService;
    constructor(authService: ClientKafka, atmService: ClientKafka, appService: AppService, loggerService: LoggerService);
    onModuleInit(): void;
    testCommandHandler(message: any, context: KafkaContext): {
        success: boolean;
        message: string;
    };
    selectDrone(message: ChooseDroneDto): {
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
}
