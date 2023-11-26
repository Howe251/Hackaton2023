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
const microservices_1 = require("@nestjs/microservices");
const telemetry_dto_1 = require("./dto/telemetry.dto");
const rxjs_1 = require("rxjs");
const gps_service_1 = require("./services/gps/gps.service");
const drone_model_1 = require("./models/drone.model");
const logger_service_1 = require("./services/logger/logger.service");
const drone_command_model_1 = require("./models/drone-command.model");
let AppService = class AppService {
    constructor(ATMService, flightPlanningService, gpsService, loggerService) {
        this.ATMService = ATMService;
        this.flightPlanningService = flightPlanningService;
        this.gpsService = gpsService;
        this.loggerService = loggerService;
    }
    async setFlightTask(task) {
        try {
            await this.loggerService.log('drone_set_flight_task', 'Получено новое задание');
            await this.loggerService.log('drone_set_flight_task', 'Регистрация БВС в АТМ');
            const registration = await this.registerBVSInATM(task);
            if (!registration.success) {
                throw registration.error;
            }
            await this.loggerService.log('drone_set_flight_task', 'Получено подтверждение вылета');
            await this.loggerService.log('drone_set_flight_task', 'Запуск полета');
            this.processTask(task);
            return {
                success: true,
                message: "Flight approved. Starting flight",
            };
        }
        catch (error) {
            return { success: false, error };
        }
    }
    async registerBVSInATM(task) {
        return (0, rxjs_1.firstValueFrom)(this.ATMService.send("atm_register_bvs", task));
    }
    processTask(task) {
        const drone = new drone_model_1.DroneModel(this.loggerService);
        (0, rxjs_1.interval)(1000)
            .pipe((0, rxjs_1.take)(5))
            .subscribe(async (count) => {
            await this.loggerService.log('drone_set_flight_task', `Отправляю гео и телеметрию`);
            await this.sendGeo(drone, task.accessToken);
            await this.sendTelemetry(drone, task.accessToken);
            if (count === 4) {
                setTimeout(async () => {
                    await this.loggerService.log('drone_set_flight_task', `Завершаю полет`);
                    this.sendFinishTask(task, task.accessToken);
                }, 2000);
            }
        });
    }
    async sendGeo(drone, accessToken) {
        const geo = this.gpsService.getGPSPos();
        const status = await (0, rxjs_1.firstValueFrom)(this.ATMService.send('atm_set_info_geo', Object.assign(Object.assign({}, geo), { accessToken })));
        if (status.command) {
            await this.loggerService.log('drone_set_flight_task', `Получена экстренная команда "${status.command}"`);
            const emergencyCommand = new drone_command_model_1.DroneCommandModel(1, status.command);
            drone.executeCommand(emergencyCommand);
        }
    }
    async sendTelemetry(drone, accessToken) {
        const telemetry = new telemetry_dto_1.TelemetryDto();
        telemetry.speed = Math.random() * 100;
        telemetry.distanceToHome = Math.random() * 1000;
        telemetry.position = this.gpsService.getGPSPos();
        const status = await (0, rxjs_1.firstValueFrom)(this.flightPlanningService.send('fp_set_info_telemetry', Object.assign(Object.assign({}, telemetry), { accessToken })));
        if (status.command) {
            await this.loggerService.log('drone_set_flight_task', `Получена управляющая команда "${status.command}"`);
            const regularCommand = new drone_command_model_1.DroneCommandModel(0, status.command);
            drone.executeCommand(regularCommand);
        }
    }
    sendFinishTask(task, accessToken) {
        this.flightPlanningService.emit('fp_finish_task', Object.assign(Object.assign({}, task), { accessToken }));
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AIR_TRAFFIC_MANAGER_SERVICE')),
    __param(1, (0, common_1.Inject)('FLIGHT_PLANNING_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientKafka,
        microservices_1.ClientKafka,
        gps_service_1.GpsService,
        logger_service_1.LoggerService])
], AppService);
//# sourceMappingURL=app.service.js.map