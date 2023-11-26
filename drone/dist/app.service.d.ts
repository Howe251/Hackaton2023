import { ClientKafka } from '@nestjs/microservices';
import { FlightTaskDto } from './dto/flightTaskDto';
import { GpsService } from './services/gps/gps.service';
import { LoggerService } from './services/logger/logger.service';
export declare class AppService {
    private readonly ATMService;
    private readonly flightPlanningService;
    private readonly gpsService;
    private readonly loggerService;
    constructor(ATMService: ClientKafka, flightPlanningService: ClientKafka, gpsService: GpsService, loggerService: LoggerService);
    setFlightTask(task: FlightTaskDto): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message?: undefined;
    }>;
    registerBVSInATM(task: FlightTaskDto): Promise<any>;
    private processTask;
    private sendGeo;
    private sendTelemetry;
    private sendFinishTask;
}
