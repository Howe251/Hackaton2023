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
exports.AuthInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const microservices_1 = require("@nestjs/microservices");
const logger_service_1 = require("../../services/logger/logger.service");
let AuthInterceptor = class AuthInterceptor {
    constructor(authService, loggerService) {
        this.authService = authService;
        this.loggerService = loggerService;
    }
    async intercept(context, next) {
        const message = context.switchToRpc().getData();
        const authResponse = await (0, rxjs_1.firstValueFrom)(this.authService.send('auth_verify_token', message));
        if (!authResponse.success) {
            const response = {
                success: false,
                error: new common_1.UnauthorizedException(),
            };
            this.loggerService.log('auth_interceptor', response);
            return (0, rxjs_1.of)(response);
        }
        return next.handle();
    }
};
AuthInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AUTH_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientKafka,
        logger_service_1.LoggerService])
], AuthInterceptor);
exports.AuthInterceptor = AuthInterceptor;
//# sourceMappingURL=auth.interceptor.js.map