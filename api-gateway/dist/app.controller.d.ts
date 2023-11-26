import { OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { CreateDroneDto } from './dto/create-drone.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetInfoDto } from './dto/get-info.dto';
export declare class AppController implements OnModuleInit {
    private readonly appService;
    private readonly flightPlanningService;
    private readonly authService;
    constructor(appService: AppService, flightPlanningService: ClientKafka, authService: ClientKafka);
    onModuleInit(): void;
    login(body: LoginDto): import("rxjs").Observable<any>;
    selectDrone(body: CreateDroneDto, headers: any): import("rxjs").Observable<any>;
    createTask(body: CreateTaskDto, headers: any): import("rxjs").Observable<any>;
    getInfo(body: GetInfoDto, headers: any): import("rxjs").Observable<any>;
}
