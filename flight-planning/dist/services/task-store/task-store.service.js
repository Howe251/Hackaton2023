"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStoreService = void 0;
const common_1 = require("@nestjs/common");
const task_model_1 = require("../../models/task.model");
let TaskStoreService = class TaskStoreService {
    constructor() {
        this.currentId = 0;
        this.tasks = [];
    }
    addTasks(dto) {
        if (!this.validate(dto)) {
            throw new common_1.BadRequestException('Invalid task');
        }
        const task = this.createTask(dto);
        this.tasks.push(task);
        return task;
    }
    finishTask(id) {
        const task = this.getTaskById(id);
        if (!task) {
            throw new common_1.BadRequestException('Task not found');
        }
    }
    getTask(id) {
        const task = this.getTaskById(id);
        if (!task) {
            throw new common_1.BadRequestException('Task not found');
        }
        return task;
    }
    validate(task) {
        if (task.description.toLowerCase().includes('valid_task')) {
            return true;
        }
        return false;
    }
    createTask(dto) {
        return new task_model_1.TaskModel(this.currentId++, dto);
    }
    getTaskById(id) {
        return this.tasks.find(task => task.id === id);
    }
};
TaskStoreService = __decorate([
    (0, common_1.Injectable)()
], TaskStoreService);
exports.TaskStoreService = TaskStoreService;
//# sourceMappingURL=task-store.service.js.map