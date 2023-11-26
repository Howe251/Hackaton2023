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
const user_db_1 = require("./db/user.db");
const jwt_1 = require("@nestjs/jwt");
const logger_service_1 = require("./services/logger/logger.service");
let AppService = class AppService {
    constructor(jwtService, logger) {
        this.jwtService = jwtService;
        this.logger = logger;
    }
    login({ email, password }) {
        const user = user_db_1.userDb.getUserByEmail(email);
        let response;
        if (user && user_db_1.userDb.isCorrectPassword(user, password)) {
            const payload = { email: user.email, id: user.id, name: user.name };
            response = {
                success: true,
                accessToken: this.jwtService.sign(payload),
            };
            this.logger.log('auth_login', response);
            return response;
        }
        response = {
            success: false,
            error: new common_1.UnauthorizedException(),
        };
        this.logger.log('auth_login', response);
        return response;
    }
    verifyToken({ accessToken }) {
        try {
            const user = this.jwtService.verify(accessToken);
            return {
                success: true,
                user,
            };
        }
        catch (e) {
            return {
                success: false,
                error: new common_1.UnauthorizedException(),
            };
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        logger_service_1.LoggerService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map