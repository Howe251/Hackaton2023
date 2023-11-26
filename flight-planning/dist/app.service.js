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
const logger_service_1 = require("./services/logger/logger.service");
let AppService = class AppService {
    constructor(atmService, droneService, droneStoreService, taskStoreService, loggerService) {
        this.atmService = atmService;
        this.droneService = droneService;
        this.droneStoreService = droneStoreService;
        this.taskStoreService = taskStoreService;
        this.loggerService = loggerService;
    }
    async selectDrone(data) {
        try {
            await this.loggerService.log('fp_select_drone', 'Получен запрос на выбор Дрона');
            await this.loggerService.log('fp_select_drone', 'Проверка совместимости оператора и дрона');
            const { message, permission } = this.droneStoreService.selectDrone(data.droneId, data.userId);
            await this.loggerService.log('fp_select_drone', 'Разрешение получено, дрон выбран');
            return {
                success: true,
                message: message,
                data: { permission },
            };
        }
        catch (error) {
            await this.loggerService.log('fp_select_drone', 'Разрешение не получено, дрон не выбран');
            return {
                success: false,
                error,
            };
        }
    }
    async createTask(data) {
        try {
            await this.loggerService.log('fp_create-task', `Получено новое задание для дрона ${data.droneId}`);
            await this.loggerService.log('fp_create-task', 'Проверка разрешения');
            this.droneStoreService.verifyPermission(data.permission);
            await this.loggerService.log('fp_create-task', 'Разрешение валидно');
            const task = this.taskStoreService.addTasks(data);
            await this.loggerService.log('fp_create-task', 'Отправка задачи в АТМ для првоерки полетного задания');
            const taskApproval = await (0, rxjs_1.firstValueFrom)(this.atmService.send('atm_approve_task', Object.assign(Object.assign({}, data), task)));
            if (!taskApproval.success) {
                throw taskApproval.error;
            }
            await this.loggerService.log('fp_create-task', 'Полетное задание согласовано с АТМ');
            await this.loggerService.log('fp_create-task', 'Полетное задание отправлено дрону');
            const droneResponse = await (0, rxjs_1.firstValueFrom)(this.droneService.send('drone_set_flight_task', Object.assign(Object.assign({}, data), task)));
            if (!droneResponse.success) {
                throw droneResponse.error;
            }
            await this.loggerService.log('fp_create-task', 'Полетное задание принято дроном');
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
    finishTask(data) {
        this.droneStoreService.storeDrone(data.permission, data.droneId);
        this.taskStoreService.finishTask(data['id']);
        this.loggerService.log('fp_finish_task', `Дрон ${data.droneId} завершил задание ${data['id']} и вернулся на базу`);
    }
    async getInfo(data) {
        try {
        }
        catch (error) {
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ATM_SERVICE')),
    __param(1, (0, common_1.Inject)('DRONE_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientKafka,
        microservices_1.ClientKafka,
        drone_store_service_1.DroneStoreService,
        task_store_service_1.TaskStoreService,
        logger_service_1.LoggerService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map