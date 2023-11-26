import { BadRequestException, Injectable } from '@nestjs/common';
import { TaskModel } from '../../models/task.model';
import { TaskDto } from '../../dto/task.dto';

@Injectable()
export class TaskStoreService {
  private currentId = 1;
  private readonly tasks: TaskModel[] = [];

  public addTasks(dto: TaskDto): TaskModel {
    if (!this.validate(dto)) {
      throw new BadRequestException('Invalid task');
    }

    if (this.tasks.some((task) => task.permission === dto.permission)) {
      throw new BadRequestException('This task already exists');
    }

    const task = this.createTask(dto);
    this.tasks.push(task);

    return task;
  }

  public finishTask(id: number): void {
    const task = this.getTaskById(id);
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }

  public getTask(id: number): TaskModel {
    const task = this.getTaskById(id);

    if (!task) {
      throw new BadRequestException('Task not found');
    }

    return task;
  }

  private validate(task: TaskDto): boolean {
    if (task.description.toLowerCase().includes('valid_task')) {
      return true;
    }

    return false;
  }

  private createTask(dto: TaskDto): TaskModel {
    return new TaskModel(
      this.currentId++,
      dto
    );
  }

  private getTaskById(id: number): TaskModel | undefined {
    return this.tasks.find(task => task.id === id);
  }
}
