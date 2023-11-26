import { GPSDto } from "./GPS.dto";
import { ContextDto } from "./context.dto";

export class TelemetryDto extends ContextDto {
    speed: number;
    position: GPSDto;
    distanceToHome: number;
}
