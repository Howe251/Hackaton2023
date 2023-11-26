import { GPSDto } from "./GPS.dto";
import { ContextDto } from "./context.dto";
export declare class TelemetryDto extends ContextDto {
    speed: number;
    position: GPSDto;
    satCount: number;
    compasDeg: number;
    distanceToHome: number;
}
