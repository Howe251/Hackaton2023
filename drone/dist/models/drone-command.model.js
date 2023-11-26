"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DroneCommandModel = void 0;
class DroneCommandModel {
    constructor(priority, command) {
        this.priority = priority;
        this.command = command;
        this.timeoutId = null;
    }
    process(cb) {
        this.timeoutId = setTimeout(() => {
            clearTimeout(this.timeoutId);
            cb();
        }, 200);
    }
}
exports.DroneCommandModel = DroneCommandModel;
//# sourceMappingURL=drone-command.model.js.map