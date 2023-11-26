import { DroneCommandModel } from './drone-command.model';
import { LoggerService } from '../services/logger/logger.service';
export declare class DroneModel {
    private readonly loggerService;
    private commandQueue;
    private commandInProgress;
    constructor(loggerService: LoggerService);
    executeCommand(command: DroneCommandModel): void;
    private runCommand;
    private sortQueueByPriority;
}
