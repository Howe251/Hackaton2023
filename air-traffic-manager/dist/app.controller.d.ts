import { OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';
export declare class AppController implements OnModuleInit {
    private readonly authService;
    private readonly appService;
    constructor(authService: ClientKafka, appService: AppService);
    onModuleInit(): void;
    approveTask(data: any): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: import("@nestjs/common").BadRequestException;
        message?: undefined;
    }>;
    registerBvsHandler(data: any): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: import("@nestjs/common").BadRequestException;
        message?: undefined;
    }>;
    SetInfoGeoHandler(data: any): Promise<{
        success: boolean;
        message: string;
        command?: undefined;
    } | {
        success: boolean;
        message: string;
        command: string;
    }>;
    setMissionComplete(data: any): {
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: import("@nestjs/common").BadRequestException;
        message?: undefined;
    };
}
