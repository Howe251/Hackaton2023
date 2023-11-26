import { ClientKafka } from '@nestjs/microservices';
import { GPSDto } from './dto/GPS.dto';
import { Flightplan } from './dto/flightplan.dto';
export declare class AppService {
    private readonly atm;
    private readonly flightPlanningService;
    private readonly tasklist;
    private takeoff;
    constructor(atm: ClientKafka, flightPlanningService: ClientKafka);
    setGetTaskHandler(data: any): {
        success: boolean;
    };
    sendPlanBVS(data: Flightplan): Promise<void>;
    executeCommand(data: any): {
        success: true;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        message?: undefined;
    };
    executeAlarmCommand(data: any): {
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        message?: undefined;
    };
    sendGPS(): void;
    sendTelemetry(): void;
    sendEndTask(): void;
    getGPSPos(): GPSDto;
}
