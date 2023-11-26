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
        this.selectedDrones = [];
    }
    findDroneById(id) {
        return this.drones.find(drone => drone.id === id);
    }
    findDroneByPermission(permission) {
        return this.selectedDrones.some(drone => drone.permission === permission);
    }
    selectDrone(id, ownerId) {
        const drone = this.findDroneById(id);
        if (!drone) {
            throw new common_1.BadRequestException('Drone not found');
        }
        if (!drone.owners.includes(ownerId)) {
            throw new common_1.BadRequestException('You are not the owner of this drone');
        }
        const isDroneSelected = this.selectedDrones.some((item) => item.id === id);
        if (isDroneSelected) {
            throw new common_1.BadRequestException('Drone is already selected');
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
    verifyPermission(permission) {
        const isPermissionValid = this.findDroneByPermission(permission);
        if (!isPermissionValid) {
            throw new common_1.BadRequestException('Invalid permission');
        }
    }
    getPermission() {
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
};
DroneStoreService = __decorate([
    (0, common_1.Injectable)()
], DroneStoreService);
exports.DroneStoreService = DroneStoreService;
//# sourceMappingURL=drone-store.service.js.map