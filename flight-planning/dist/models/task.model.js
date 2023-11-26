"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = void 0;
const task_dto_1 = require("../dto/task.dto");
class TaskModel extends task_dto_1.TaskDto {
    constructor(id, dto) {
        super();
        this.status = 'CREATED';
        this.id = id;
        this.droneId = dto.droneId;
        this.name = dto.name;
        this.description = dto.description;
        this.createdAt = Date.now();
        this.permission = dto.permission;
    }
    start() {
        this.setStatus('IN_PROGRESS');
    }
    finish() {
        this.setStatus('FINISHED');
    }
    toString() {
        const task = {
            id: this.id,
            droneId: this.droneId,
            name: this.name,
            description: this.description,
            createdAt: this.createdAt,
            status: this.status,
        };
        return Object.entries(task)
            .map((key, value) => `${key}: ${value} \n`)
            .join('');
    }
    setStatus(status) {
        this.status = status;
    }
}
exports.TaskModel = TaskModel;
//# sourceMappingURL=task.model.js.map