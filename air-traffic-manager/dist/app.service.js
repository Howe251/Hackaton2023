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
const taskList = ['123456', '123455', '12312378', '12378367156', 'twst'];
const btnList = ['213821ghdhdhq', '12312dewj9dfw', 'test'];
const xСoordinates = [1, 2, 3, 4, 4, 6, 6, 7, 8];
const yCoordinates = [0, 1, 3, 4, 5, 5, 6, 6, 7, 77, 7, 4, 4];
let AppService = class AppService {
    constructor() { }
    setTaskHandler(data) {
        const result = taskList.find((id) => id === data.id);
        if (result) {
            console.log('Вылет согласован');
            return {
                success: true,
                message: 'Вылет согласован',
            };
        }
        console.log('Задача не найдена');
        return {
            success: false,
            error: new common_1.BadRequestException('Задача не найдена'),
        };
    }
    registerBvsHandler(data) {
        const result = btnList.find((id) => id === data.id);
        if (result) {
            console.log('Регистрация выполнена');
            return {
                success: true,
                message: 'Регистрация выполнена',
            };
        }
        console.log('Регистрация не найдена');
        return {
            success: false,
            error: new common_1.BadRequestException('Регистрация не найдена'),
        };
    }
    SetInfoGeoHandler(data) {
        const xResult = xСoordinates.find((id) => id === data.id);
        const yResult = yCoordinates.find((id) => id === data.id);
        if (xResult && yResult) {
            console.log('Координаты соотвествуют заданному пути');
            return {
                success: true,
                message: 'Координаты соотвествуют заданному пути',
            };
        }
        console.log('Экстренная команда');
        return {
            success: false,
            message: new common_1.BadRequestException('Экстренная команда'),
        };
    }
    setMissionComplete(data) {
        if (data.success === true) {
            console.log('Миссия выполнена.');
            return {
                success: true,
                message: 'Миссия выполнена',
            };
        }
        console.log('Миссия не выполнена.');
        return {
            success: false,
            error: new common_1.BadRequestException('Миссия не выполнена'),
        };
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map