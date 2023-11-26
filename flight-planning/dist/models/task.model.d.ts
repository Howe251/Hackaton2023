import { TaskDto } from '../dto/task.dto';
export declare class TaskModel extends TaskDto {
    readonly id: number;
    readonly createdAt: number;
    private status;
    constructor(id: number, dto: TaskDto);
    start(): void;
    finish(): void;
    toString(): string;
    private setStatus;
}
