import { OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, KafkaContext } from '@nestjs/microservices';
export declare class AppController implements OnModuleInit {
    private readonly authService;
    private readonly appService;
    constructor(authService: ClientKafka, appService: AppService);
    onModuleInit(): void;
    setTaskHandler(data: any, context: KafkaContext): {
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: import("@nestjs/common").BadRequestException;
        message?: undefined;
    };
    registerBvsHandler(data: any, context: KafkaContext): {
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: import("@nestjs/common").BadRequestException;
        message?: undefined;
    };
    SetInfoGeoHandler(data: any, context: KafkaContext): {
        success: boolean;
        message: string;
    } | {
        success: boolean;
        message: import("@nestjs/common").BadRequestException;
    };
    setMissionComplete(data: any, context: KafkaContext): {
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: import("@nestjs/common").BadRequestException;
        message?: undefined;
    };
}
