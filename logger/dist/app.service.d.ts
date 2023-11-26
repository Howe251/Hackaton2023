import { LoggerDto } from './dto/logger.dto';
export declare class AppService {
    private readonly reset;
    private readonly cyan;
    private readonly yellow;
    log(data: LoggerDto): void;
    private getColoredPrefix;
    private getDateTime;
}
