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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("./services/logger/logger.service");
const taskList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const btnList = [1, 2, 3, 4, 5];
let AppService = class AppService {
    constructor(loggerService) {
        this.loggerService = loggerService;
    }
    async approveTaskHandler(data) {
        await this.loggerService.log('atm_approve_task', 'Получено задание для согласования вылета');
        const result = taskList.find((id) => id === data.id);
        if (result) {
            await this.loggerService.log('atm_approve_task', 'Задача найдена, вылет согласован');
            return {
                success: true,
                message: 'Вылет согласован',
            };
        }
        await this.loggerService.log('atm_approve_task', 'Задача не найдена, вылет не согласован');
        return {
            success: false,
            error: new common_1.BadRequestException('Задача не найдена'),
        };
    }
    async registerBvsHandler(data) {
        await this.loggerService.log('atm_register_bvs', 'Получен запрос проверки регистрации БВС и подтверждения вылета');
        const result = btnList.find((id) => id === data.id);
        if (result) {
            await this.loggerService.log('atm_register_bvs', 'Регистрация найдена, вылет подтвержден');
            return {
                success: true,
                message: 'Регистрация выполнена',
            };
        }
        await this.loggerService.log('atm_register_bvs', 'Регистрация не найдена, вылет не подтвержден');
        return {
            success: false,
            error: new common_1.BadRequestException('Регистрация не найдена'),
        };
    }
    async SetInfoGeoHandler(data) {
        await this.loggerService.log('atm_set_info_geo', 'Получены координаты дрона, выполняется проверка соответствия заданному пути');
        const isAllowedCoords = !!Math.floor(Math.random() * 2);
        if (isAllowedCoords) {
            await this.loggerService.log('atm_set_info_geo', 'Координаты соотвествуют заданному пути');
            return {
                success: true,
                message: 'Координаты соотвествуют заданному пути',
            };
        }
        await this.loggerService.log('atm_set_info_geo', 'Координаты не соотвествуют заданному пути, отправлена экстренная команда');
        return {
            success: false,
            message: 'Экстренная команда',
            command: 'Экстренная команда ' + Date.now(),
        };
    }
    setMissionComplete(data) {
        if (data.success === true) {
            this.loggerService.log('atm_set_mission_complete', 'Миссия выполнена');
            return {
                success: true,
                message: 'Миссия выполнена',
            };
        }
        this.loggerService.log('atm_set_mission_complete', 'Миссия не выполнена');
        return {
            success: false,
            error: new common_1.BadRequestException('Миссия не выполнена'),
        };
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.LoggerService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map