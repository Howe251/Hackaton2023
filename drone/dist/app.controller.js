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
const flightplan_dto_1 = require("./dto/flightplan.dto");
const command_dto_1 = require("./dto/command.dto");
const auth_interceptor_1 = require("./interceptor/auth/auth.interceptor");
let AppController = class AppController {
    constructor(appService, flightPlanningService, authService, atm) {
        this.appService = appService;
        this.flightPlanningService = flightPlanningService;
        this.authService = authService;
        this.atm = atm;
    }
    onModuleInit() {
        this.authService.subscribeToResponseOf('auth_verify_token');
        this.atm.subscribeToResponseOf('atm_register_bvs');
        this.flightPlanningService.subscribeToResponseOf('dronecom');
        this.atm.subscribeToResponseOf('drone_command_alarm');
    }
    setplan(message) {
        console.log(message);
        return this.appService.setGetTaskHandler(message);
    }
    executeCom(message) {
        return this.appService.executeCommand(message);
    }
    executeAlarmCom(message) {
        return this.appService.executeAlarmCommand(message);
    }
};
exports.AppController = AppController;
__decorate([
    (0, microservices_1.MessagePattern)('drone_set_flight_plan'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [flightplan_dto_1.Flightplan]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "setplan", null);
__decorate([
    (0, microservices_1.MessagePattern)('drone_command'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [command_dto_1.Command]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "executeCom", null);
__decorate([
    (0, microservices_1.MessagePattern)('drone_alarm_command'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [command_dto_1.Command]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "executeAlarmCom", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseInterceptors)(auth_interceptor_1.AuthInterceptor),
    __param(1, (0, common_1.Inject)('FLIGHT_PLANNING_SERVICE')),
    __param(2, (0, common_1.Inject)('AUTH_SERVICE')),
    __param(3, (0, common_1.Inject)('AIR_TRAFFIC_MANAGER')),
    __metadata("design:paramtypes", [app_service_1.AppService,
        microservices_1.ClientKafka,
        microservices_1.ClientKafka,
        microservices_1.ClientKafka])
], AppController);
//# sourceMappingURL=app.controller.js.map