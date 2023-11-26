import { ClientKafka } from '@nestjs/microservices';
import { GPS } from './dto/GPS.dto';
import { Flightplan } from './dto/flightplan.dto';
export declare class AppService {
    private readonly atm;
    private readonly flightPlanningService;
    private readonly tasklist;
    private takeoff;
    constructor(atm: ClientKafka, flightPlanningService: ClientKafka);
    setGetTaskHandler(data: any): boolean;
    sendPlanBVS(data: Flightplan, accessToken: string): Promise<void>;
    executeCommand(data: any): any;
    executeAlarmCommand(data: any): any;
    sendGPS(): void;
    sendTelemetry(): void;
    sendEndTask(): void;
    getGPSPos(): GPS;
}
