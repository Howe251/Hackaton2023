"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const microservices_1 = require("@nestjs/microservices");
const drone_store_service_1 = require("./services/drone-store/drone-store.service");
const logger_service_1 = require("./services/logger/logger.service");
const task_store_service_1 = require("./services/task-store/task-store.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'AUTH_SERVICE',
                    transport: microservices_1.Transport.KAFKA,
                    options: {
                        client: {
                            clientId: 'auth',
                            brokers: ['localhost:29092'],
                        },
                        consumer: {
                            groupId: 'auth-consumer' + Math.random(),
                        },
                    },
                },
                {
                    name: 'LOGGER_SERVICE',
                    transport: microservices_1.Transport.KAFKA,
                    options: {
                        client: {
                            clientId: 'logger',
                            brokers: ['localhost:29092'],
                        },
                        consumer: {
                            groupId: 'logger-consumer' + Math.random(),
                        },
                    },
                },
                {
                    name: 'ATM_SERVICE',
                    transport: microservices_1.Transport.KAFKA,
                    options: {
                        client: {
                            clientId: 'atm',
                            brokers: ['localhost:29092'],
                        },
                        consumer: {
                            groupId: 'air-traffic-manager-consumer' + Math.random(),
                        },
                    },
                },
            ]),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, drone_store_service_1.DroneStoreService, logger_service_1.LoggerService, task_store_service_1.TaskStoreService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map