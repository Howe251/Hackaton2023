import { ContextDto } from './context.dto';

export class TaskDto extends ContextDto {
  droneId: number;
  name: string;
  description: string;
  permission: string;
}
