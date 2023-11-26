import { GPS } from "./GPS.dto";

export class Telemetry {
    speed: number; // тоже поменять на стринг
    position: GPS; // Класс GPS с координатами. Так можно?
    satCount: number;
    compasDeg: number;
    distanceToHome: number;
}
