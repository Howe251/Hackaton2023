import { TaskModel } from '../../models/task.model';
import { TaskDto } from '../../dto/task.dto';
export declare class TaskStoreService {
    private currentId;
    private readonly tasks;
    addTasks(dto: TaskDto): TaskDto;
    finishTask(id: number): void;
    getTask(id: number): TaskModel;
    private validate;
    private createTask;
    private getTaskById;
}
