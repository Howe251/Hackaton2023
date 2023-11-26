import { TaskModel } from '../../models/task.model';
import { TaskDto } from '../../dto/task.dto';
export declare class TaskStoreService {
    private readonly tasks;
    addTasks(dto: TaskDto): TaskModel;
    finishTask(id: number): void;
    getTask(id: number): TaskModel;
    private validate;
    private createTask;
    private getTaskById;
}
