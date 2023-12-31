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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const microservices_1 = require("@nestjs/microservices");
const choose_drone_dto_1 = require("./dto/choose-drone.dto");
const auth_interceptor_1 = require("./interceptors/auth/auth.interceptor");
const logger_service_1 = require("./services/logger/logger.service");
const task_dto_1 = require("./dto/task.dto");
const get_info_dto_1 = require("./dto/get-info.dto");
let AppController = class AppController {
    constructor(authService, atmService, droneService, appService, loggerService) {
        this.authService = authService;
        this.atmService = atmService;
        this.droneService = droneService;
        this.appService = appService;
        this.loggerService = loggerService;
    }
    onModuleInit() {
        this.authService.subscribeToResponseOf('auth_verify_token');
        this.atmService.subscribeToResponseOf('atm_approve_task');
        this.droneService.subscribeToResponseOf('drone_set_flight_task');
    }
    async selectDrone(message) {
        const response = await this.appService.selectDrone(message);
        await this.loggerService.log('fp_select_drone', response);
        return response;
    }
    async createTask(message) {
        const response = await this.appService.createTask(message);
        this.loggerService.log('fp_create-task', response);
        return response;
    }
    async setInfoTelemetry(message) {
        await this.loggerService.log('fp_set_info_telemetry', 'Получена телеметрия');
        const isNeedToSendCommand = !!Math.floor(Math.random() * 2);
        if (isNeedToSendCommand) {
            await this.loggerService.log('fp_set_info_telemetry', 'Отправляю управляющую команду на основе телеметрии');
        }
        return {
            success: true,
            message: 'Telemetry received',
            command: isNeedToSendCommand ? 'Управляющая команда ' + Date.now() : '',
        };
    }
    finishTask(message) {
        this.appService.finishTask(message);
    }
    async getInfo(message) {
        const response = await this.appService.getInfo(message);
        this.loggerService.log('fp_get_info', response);
        return response;
    }
};
__decorate([
    (0, microservices_1.MessagePattern)('fp_select_drone'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [choose_drone_dto_1.ChooseDroneDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "selectDrone", null);
__decorate([
    (0, microservices_1.MessagePattern)('fp_create-task'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.TaskDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createTask", null);
__decorate([
    (0, microservices_1.MessagePattern)('fp_set_info_telemetry'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "setInfoTelemetry", null);
__decorate([
    (0, microservices_1.MessagePattern)('fp_finish_task'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_dto_1.TaskDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "finishTask", null);
__decorate([
    (0, microservices_1.MessagePattern)('fp_get_info'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_info_dto_1.GetInfoDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getInfo", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseInterceptors)(auth_interceptor_1.AuthInterceptor),
    __param(0, (0, common_1.Inject)('AUTH_SERVICE')),
    __param(1, (0, common_1.Inject)('ATM_SERVICE')),
    __param(2, (0, common_1.Inject)('DRONE_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientKafka,
        microservices_1.ClientKafka,
        microservices_1.ClientKafka,
        app_service_1.AppService,
        logger_service_1.LoggerService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map