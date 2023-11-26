import { DroneCommandModel } from './drone-command.model';
import { LoggerService } from '../services/logger/logger.service';

export class DroneModel {
  private commandQueue: DroneCommandModel[] = [];
  private commandInProgress: DroneCommandModel | null = null;

  constructor(
    private readonly loggerService: LoggerService,
  ) {}

  public executeCommand(command: DroneCommandModel) {
    if (!this.commandInProgress) {
      this.runCommand(command);
      return;
    }

    const isEmergency = command.priority === 1;
    const isCommandInProgressEmergency = this.commandInProgress?.priority === 1;

    // RUN EMERGENCY COMMAND
    if (this.commandInProgress && !isCommandInProgressEmergency && isEmergency) {
      this.commandInProgress = null;
      this.commandQueue.shift();
      this.runCommand(command);
      return;
    }

    this.commandQueue.push(command);
    this.sortQueueByPriority();
  }

  private runCommand(command: DroneCommandModel): void {
    this.loggerService.log(`RUNNING COMMAND [${command.priority === 1 ? 'EMERGENCY' : 'NORMAL'}]:`, command.command);

    command.process(() => {
      this.commandInProgress = null;

      if (this.commandQueue.length > 0) {
        this.runCommand(this.commandQueue.shift());
      }
    });

    this.commandInProgress = command;
  }

  private sortQueueByPriority(): void {
    this.commandQueue.sort((a, b) => a.priority - b.priority);
  }
}
