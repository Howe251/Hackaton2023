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
    setplan(message: Flightplan): {
        success: boolean;
    };
    executeCom(message: Command): {
        success: true;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        message?: undefined;
    };
    executeAlarmCom(message: Command): {
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        message?: undefined;
    };
}
