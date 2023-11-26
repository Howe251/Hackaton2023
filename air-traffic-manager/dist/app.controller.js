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
const auth_interceptor_1 = require("./interceptor/auth/auth.interceptor");
let AppController = class AppController {
    constructor(appService, authService) {
        this.appService = appService;
        this.authService = authService;
    }
    onModuleInit() {
        console.log('onModuleInit');
        this.authService.subscribeToResponseOf('auth_verify_token');
    }
    setTaskHandler(data, context) {
        return this.appService.setTaskHandler(data);
    }
    registerBvsHandler(data, context) {
        return this.appService.registerBvsHandler(data);
    }
    SetInfoGeoHandler(data, context) {
        return this.appService.SetInfoGeoHandler(data);
    }
    setMissionComplete(data, context) {
        return this.appService.setMissionComplete(data);
    }
};
__decorate([
    (0, microservices_1.MessagePattern)('atm_set_task'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, microservices_1.KafkaContext]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "setTaskHandler", null);
__decorate([
    (0, microservices_1.MessagePattern)('atm_register_bvs'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, microservices_1.KafkaContext]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "registerBvsHandler", null);
__decorate([
    (0, microservices_1.MessagePattern)('atm_set_info_geo'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, microservices_1.KafkaContext]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "SetInfoGeoHandler", null);
__decorate([
    (0, microservices_1.MessagePattern)('atm_set_mission_complete'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, microservices_1.KafkaContext]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "setMissionComplete", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseInterceptors)(auth_interceptor_1.AuthInterceptor),
    __param(1, (0, common_1.Inject)('AUTH_SERVICE')),
    __metadata("design:paramtypes", [app_service_1.AppService,
        microservices_1.ClientKafka])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map