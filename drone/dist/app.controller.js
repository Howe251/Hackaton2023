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
const flightTaskDto_1 = require("./dto/flightTaskDto");
const auth_interceptor_1 = require("./interceptor/auth/auth.interceptor");
let AppController = class AppController {
    constructor(flightPlanningService, authService, atm, appService) {
        this.flightPlanningService = flightPlanningService;
        this.authService = authService;
        this.atm = atm;
        this.appService = appService;
    }
    onModuleInit() {
        this.authService.subscribeToResponseOf('auth_verify_token');
        this.atm.subscribeToResponseOf('atm_register_bvs');
        this.atm.subscribeToResponseOf('atm_set_info_geo');
        this.flightPlanningService.subscribeToResponseOf('fp_set_info_telemetry');
    }
    async setFlightTask(message) {
        return await this.appService.setFlightTask(message);
    }
};
exports.AppController = AppController;
__decorate([
    (0, microservices_1.MessagePattern)('drone_set_flight_task'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [flightTaskDto_1.FlightTaskDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "setFlightTask", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseInterceptors)(auth_interceptor_1.AuthInterceptor),
    __param(0, (0, common_1.Inject)('FLIGHT_PLANNING_SERVICE')),
    __param(1, (0, common_1.Inject)('AUTH_SERVICE')),
    __param(2, (0, common_1.Inject)('AIR_TRAFFIC_MANAGER_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientKafka,
        microservices_1.ClientKafka,
        microservices_1.ClientKafka,
        app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map