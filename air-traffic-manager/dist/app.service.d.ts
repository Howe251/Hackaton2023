import { BadRequestException } from '@nestjs/common';
export declare class AppService {
    constructor();
    setTaskHandler(data: any): {
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: BadRequestException;
        message?: undefined;
    };
    registerBvsHandler(data: any): {
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: BadRequestException;
        message?: undefined;
    };
    SetInfoGeoHandler(data: any): {
        success: boolean;
        message: string;
    } | {
        success: boolean;
        message: BadRequestException;
    };
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
