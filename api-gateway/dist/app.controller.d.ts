import { OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { TestCommandDto } from './test-command.dto';
import { ClientKafka } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
export declare class AppController implements OnModuleInit {
    private readonly appService;
    private readonly flightPlanningService;
    private readonly authService;
    constructor(appService: AppService, flightPlanningService: ClientKafka, authService: ClientKafka);
    onModuleInit(): void;
    testCommand(body: TestCommandDto, headers: any): import("rxjs").Observable<any>;
    login(body: LoginDto): import("rxjs").Observable<any>;
}
