import { BadRequestException } from '@nestjs/common';
export declare class DroneStoreService {
    private readonly drones;
    private readonly selectedDrones;
    private findDroneById;
    selectDrone(id: number, ownerId: number): {
        success: boolean;
        error: BadRequestException;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        error?: undefined;
    };
}
