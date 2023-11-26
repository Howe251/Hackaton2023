import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class DroneStoreService {
  private readonly drones = [
    {
      id: 1,
      name: 'Drone 1',
      owners: [1, 2, 3]
    },
    {
      id: 2,
      name: 'Drone 2',
      owners: [1, 2, 3]
    },
    {
      id: 3,
      name: 'Drone 3',
      owners: [3]
    },
    {
      id: 4,
      name: 'Drone 4',
      owners: [1, 3]
    },
    {
      id: 5,
      name: 'Drone 5',
      owners: [1, 2]
    },
  ];
  private readonly selectedDrones: { id: number, permission: string }[] = [];

  private findDroneById(id: number) {
    return this.drones.find(drone => drone.id === id);
  }

  private findDroneByPermission(permission: string): boolean {
    return this.selectedDrones.some(drone => drone.permission === permission);
  }

  public selectDrone(id: number, ownerId: number) {
    const drone = this.findDroneById(id);

    if (!drone) {
      throw new BadRequestException('Drone not found');
    }

    if (!drone.owners.includes(ownerId)) {
      throw new BadRequestException('You are not the owner of this drone');
    }

    const isDroneSelected = this.selectedDrones.some((item) => item.id === id);

    if (isDroneSelected) {
      throw new BadRequestException('Drone is already selected');
    }

    const permission = this.getPermission();
    this.selectedDrones.push({
      id: drone.id,
      permission,
    });

    return {
      message: `Drone "${drone.name}" selected`,
      permission,
    };
  }

  public verifyPermission(permission: string): void {
    const isPermissionValid = this.findDroneByPermission(permission);

    if (!isPermissionValid) {
      throw new BadRequestException('Invalid permission');
    }
  }

  private getPermission(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 18;
    let permission = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      permission += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    permission += Date.now().toString(36);

    return permission;
  }
}
