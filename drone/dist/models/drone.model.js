"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DroneModel = void 0;
class DroneModel {
    constructor(loggerService) {
        this.loggerService = loggerService;
        this.commandQueue = [];
        this.commandInProgress = null;
    }
    executeCommand(command) {
        var _a;
        if (!this.commandInProgress) {
            this.runCommand(command);
            return;
        }
        const isEmergency = command.priority === 1;
        const isCommandInProgressEmergency = ((_a = this.commandInProgress) === null || _a === void 0 ? void 0 : _a.priority) === 1;
        if (this.commandInProgress && !isCommandInProgressEmergency && isEmergency) {
            this.commandInProgress = null;
            this.commandQueue.shift();
            this.runCommand(command);
            return;
        }
        this.commandQueue.push(command);
        this.sortQueueByPriority();
    }
    runCommand(command) {
        this.loggerService.log(`RUNNING COMMAND [${command.priority === 1 ? 'EMERGENCY' : 'NORMAL'}]:`, command.command);
        command.process(() => {
            this.commandInProgress = null;
            if (this.commandQueue.length > 0) {
                this.runCommand(this.commandQueue.shift());
            }
        });
        this.commandInProgress = command;
    }
    sortQueueByPriority() {
        this.commandQueue.sort((a, b) => a.priority - b.priority);
    }
}
exports.DroneModel = DroneModel;
//# sourceMappingURL=drone.model.js.map