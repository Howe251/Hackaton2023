import { OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';
import { FlightTaskDto } from './dto/flightTaskDto';
export declare class AppController implements OnModuleInit {
    private readonly flightPlanningService;
    private readonly authService;
    private readonly atm;
    private readonly appService;
    constructor(flightPlanningService: ClientKafka, authService: ClientKafka, atm: ClientKafka, appService: AppService);
    onModuleInit(): void;
    setFlightTask(message: FlightTaskDto): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message?: undefined;
    }>;
}
