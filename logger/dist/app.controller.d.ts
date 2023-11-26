import { AppService } from './app.service';
import { LoggerDto } from './dto/logger.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    log(data: LoggerDto): void;
}
