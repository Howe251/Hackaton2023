import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';
import { Flightplan } from './dto/flightplan.dto';
import { Command } from './dto/command.dto';
export declare class AppController {
    private readonly appService;
    private readonly flightPlanningService;
    private readonly authService;
    private readonly atm;
    constructor(appService: AppService, flightPlanningService: ClientKafka, authService: ClientKafka, atm: ClientKafka);
    onModuleInit(): void;
    setplan(message: Flightplan): boolean;
    executeCom(message: Command): any;
    executeAlarmCom(message: Command): any;
}
