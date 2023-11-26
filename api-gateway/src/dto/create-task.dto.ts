import { ContextDto } from './context.dto';

export class CreateTaskDto extends ContextDto {
  droneId: number;
  name: string;
  description: string;
  permission: string;
}
