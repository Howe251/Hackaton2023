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
const telemetry_dto_1 = require("./dto/telemetry.dto");
const GPS_dto_1 = require("./dto/GPS.dto");
const rxjs_1 = require("rxjs");
let AppService = class AppService {
    constructor(atm, flightPlanningService) {
        this.atm = atm;
        this.flightPlanningService = flightPlanningService;
        this.tasklist = [];
    }
    setGetTaskHandler(data) {
        console.log(data);
        this.tasklist.push(data);
        console.log({ "id": data.flightplan, "accessToken": data.accessToken });
        this.sendPlanBVS(data, data.accessToken);
        console.log('данные Отправлены в ОрВД');
        return true;
    }
    async sendPlanBVS(data, accessToken) {
        console.log("HERE");
        const vl = await (0, rxjs_1.firstValueFrom)(this.atm.send("atm_register_bvs", { "id": data.flightplan, "accessToken": accessToken }));
        console.log(vl);
        this.takeoff = vl.success;
        this.takeoff ? console.log("Вылет разрешён") : console.log("Вылет запрещен");
    }
    executeCommand(data) {
        console.log(data);
        return data;
    }
    executeAlarmCommand(data) {
        if (this.takeoff) {
            console.log("Экстренная команда");
            console.log(data);
            return data;
        }
    }
    sendGPS() {
        const g = this.getGPSPos();
        this.atm.emit('atm_set_info_geo', g);
    }
    sendTelemetry() {
        const t = new telemetry_dto_1.Telemetry;
        t.compasDeg = 100;
        t.distanceToHome = 20;
        t.position = this.getGPSPos();
        t.satCount = 12;
        t.speed = 10;
        this.flightPlanningService.emit('', t);
    }
    sendEndTask() {
        this.flightPlanningService.emit('', { 'TaskEnd': true, "accessToken": "" });
    }
    getGPSPos() {
        const g = new GPS_dto_1.GPS;
        g.x = Math.random() * 10;
        g.y = Math.random() * 10;
        return g;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AIR_TRAFFIC_MANAGER')),
    __param(1, (0, common_1.Inject)('FLIGHT_PLANNING_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientKafka,
        microservices_1.ClientKafka])
], AppService);
//# sourceMappingURL=app.service.js.map