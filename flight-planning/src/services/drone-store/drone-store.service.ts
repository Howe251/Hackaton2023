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
      owners: [2, 3]
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
  private readonly selectedDrones: number[] = [];

  private findDroneById(id: number) {
    return this.drones.find(drone => drone.id === id);
  }

  public selectDrone(id: number, ownerId: number) {
    const drone = this.findDroneById(id);

    if (!drone) {
      return { success: false, error: new BadRequestException('Drone not found') };
    }

    if (!drone.owners.includes(ownerId)) {
      return { success: false, error: new BadRequestException('You are not the owner of this drone') };
    }

    const isDroneSelected = this.selectedDrones.includes(id);

    if (isDroneSelected) {
      return { success: false, error: new BadRequestException('Drone is already in use') };
    }

    this.selectedDrones.push(drone.id);

    return { success: true, message: `Drone "${drone.name}" selected` };
  }
}
