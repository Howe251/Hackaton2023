import { TestCommandDto } from './test-command.dto';
import { ClientKafka } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
export declare class AppService {
    private readonly flightPlanningService;
    private readonly authService;
    constructor(flightPlanningService: ClientKafka, authService: ClientKafka);
    testCommand(data: TestCommandDto): import("rxjs").Observable<any>;
    login(data: LoginDto): import("rxjs").Observable<any>;
}
