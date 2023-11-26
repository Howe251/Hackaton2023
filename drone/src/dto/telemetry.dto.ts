import { GPSDto } from "./GPS.dto";
import { ContextDto } from "./context.dto";

export class TelemetryDto extends ContextDto {
    speed: number; // тоже поменять на стринг
    position: GPSDto;
    satCount: number;
    compasDeg: number;
    distanceToHome: number;
}
