import { BadRequestException } from '@nestjs/common';
import { LoggerService } from './services/logger/logger.service';
export declare class AppService {
    private loggerService;
    constructor(loggerService: LoggerService);
    approveTaskHandler(data: any): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: BadRequestException;
        message?: undefined;
    }>;
    registerBvsHandler(data: any): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: BadRequestException;
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
        error: BadRequestException;
        message?: undefined;
    };
}
