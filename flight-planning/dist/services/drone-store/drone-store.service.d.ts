export declare class DroneStoreService {
    private readonly drones;
    private readonly selectedDrones;
    private findDroneById;
    private findDroneByPermission;
    selectDrone(id: number, ownerId: number): {
        message: string;
        permission: string;
    };
    verifyPermission(permission: string): void;
    private getPermission;
    storeDrone(permission: string, droneId: number): void;
}
