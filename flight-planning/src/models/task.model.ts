import { TaskDto } from '../dto/task.dto';

export class TaskModel extends TaskDto {
  public readonly id: number;
  public readonly createdAt: number;
  private status: 'CREATED' | 'IN_PROGRESS' | 'FINISHED' = 'CREATED';

  constructor(
    id: number,
    dto: TaskDto,
  ) {
    super();
    this.id = id;
    this.droneId = dto.droneId;
    this.name = dto.name;
    this.description = dto.description;
    this.createdAt = Date.now();
  }

  public start(): void {
    this.setStatus('IN_PROGRESS');
  }

  public finish(): void {
    this.setStatus('FINISHED');
  }

  public toString(): string {
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

  private setStatus(status: 'IN_PROGRESS' | 'FINISHED'): void {
    this.status = status;
  }
}
