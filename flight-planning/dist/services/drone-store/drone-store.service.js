"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DroneStoreService = void 0;
const common_1 = require("@nestjs/common");
let DroneStoreService = class DroneStoreService {
    constructor() {
        this.drones = [
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
        this.selectedDrones = [];
    }
    findDroneById(id) {
        return this.drones.find(drone => drone.id === id);
    }
    selectDrone(id, ownerId) {
        const drone = this.findDroneById(id);
        if (!drone) {
            return { success: false, error: new common_1.BadRequestException('Drone not found') };
        }
        if (!drone.owners.includes(ownerId)) {
            return { success: false, error: new common_1.BadRequestException('You are not the owner of this drone') };
        }
        const isDroneSelected = this.selectedDrones.includes(id);
        if (isDroneSelected) {
            return { success: false, error: new common_1.BadRequestException('Drone is already in use') };
        }
        this.selectedDrones.push(drone.id);
        return { success: true, message: `Drone "${drone.name}" selected` };
    }
};
DroneStoreService = __decorate([
    (0, common_1.Injectable)()
], DroneStoreService);
exports.DroneStoreService = DroneStoreService;
//# sourceMappingURL=drone-store.service.js.map