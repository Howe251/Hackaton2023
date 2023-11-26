import { TestCommandDto } from './test-command.dto';
import { ClientKafka } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { CreateDroneDto } from './dto/create-drone.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetInfoDto } from './dto/get-info.dto';
import { LoggerService } from './services/logger/logger.service';
export declare class AppService {
    private readonly flightPlanningService;
    private readonly authService;
    private loggerService;
    constructor(flightPlanningService: ClientKafka, authService: ClientKafka, loggerService: LoggerService);
    testCommand(data: TestCommandDto): import("rxjs").Observable<any>;
    login(data: LoginDto): import("rxjs").Observable<any>;
    selectDrone(data: CreateDroneDto): import("rxjs").Observable<any>;
    createTask(data: CreateTaskDto): import("rxjs").Observable<any>;
    getInfo(data: GetInfoDto): import("rxjs").Observable<any>;
}
