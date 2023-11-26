"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const drone_store_service_1 = require("./services/drone-store/drone-store.service");
const task_store_service_1 = require("./services/task-store/task-store.service");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
let AppService = class AppService {
    constructor(atmService, droneStoreService, taskStoreService) {
        this.atmService = atmService;
        this.droneStoreService = droneStoreService;
        this.taskStoreService = taskStoreService;
    }
    testCommandHandler(data) {
        return { success: true, message: `${data.command} received` };
    }
    selectDrone(data) {
        try {
            const { message, permission } = this.droneStoreService.selectDrone(data.droneId, data.userId);
            return {
                success: true,
                message: message,
                data: { permission },
            };
        }
        catch (error) {
            return {
                success: false,
                error,
            };
        }
    }
    async createTask(data) {
        try {
            this.droneStoreService.verifyPermission(data.permission);
            const task = this.taskStoreService.addTasks(data);
            console.log(task);
            const atmResponse = await (0, rxjs_1.firstValueFrom)(this.atmService.send('atm_set_task', {
                id: task.id,
                accessToken: data.accessToken,
            }));
            console.log(atmResponse);
            if (!atmResponse.success) {
                throw atmResponse.error;
            }
            return {
                success: true,
                message: 'Task created',
                data: task,
            };
        }
        catch (error) {
            return {
                success: false,
                error,
            };
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ATM_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientKafka,
        drone_store_service_1.DroneStoreService,
        task_store_service_1.TaskStoreService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map