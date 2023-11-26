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
const logger_service_1 = require("./services/logger/logger.service");
let AppService = class AppService {
    constructor(flightPlanningService, authService, loggerService) {
        this.flightPlanningService = flightPlanningService;
        this.authService = authService;
        this.loggerService = loggerService;
    }
    testCommand(data) {
        return this.flightPlanningService.send('test_command', data);
    }
    login(data) {
        return this.authService.send('auth_login', data);
    }
    selectDrone(data) {
        this.loggerService.log('fp_select_drone', 'Отправлен запрос на выбор Дрона');
        return this.flightPlanningService.send('fp_select_drone', data);
    }
    createTask(data) {
        this.loggerService.log('fp_create-task', 'Отправлено новое задание');
        return this.flightPlanningService.send('fp_create-task', data);
    }
    getInfo(data) {
        return this.flightPlanningService.send('fp_get_info', data);
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('FLIGHT_PLANNING_SERVICE')),
    __param(1, (0, common_1.Inject)('AUTH_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientKafka,
        microservices_1.ClientKafka,
        logger_service_1.LoggerService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map