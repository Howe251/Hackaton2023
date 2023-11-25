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
const test_command_dto_1 = require("./test-command.dto");
const microservices_1 = require("@nestjs/microservices");
const login_dto_1 = require("./dto/login.dto");
const auth_guard_1 = require("./guards/auth/auth.guard");
const set_context_utils_1 = require("./utils/set-context.utils");
let AppController = class AppController {
    constructor(appService, flightPlanningService, authService) {
        this.appService = appService;
        this.flightPlanningService = flightPlanningService;
        this.authService = authService;
    }
    onModuleInit() {
        this.flightPlanningService.subscribeToResponseOf('test_command');
        this.authService.subscribeToResponseOf('auth_login');
        this.authService.subscribeToResponseOf('auth_verify_token');
    }
    testCommand(body, headers) {
        return this.appService.testCommand((0, set_context_utils_1.setContext)(body, headers));
    }
    login(body) {
        return this.appService.login(body);
    }
};
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('test-command'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [test_command_dto_1.TestCommandDto, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "testCommand", null);
__decorate([
    (0, common_1.Post)('auth/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "login", null);
AppController = __decorate([
    (0, common_1.Controller)(''),
    __param(1, (0, common_1.Inject)('FLIGHT_PLANNING_SERVICE')),
    __param(2, (0, common_1.Inject)('AUTH_SERVICE')),
    __metadata("design:paramtypes", [app_service_1.AppService,
        microservices_1.ClientKafka,
        microservices_1.ClientKafka])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map