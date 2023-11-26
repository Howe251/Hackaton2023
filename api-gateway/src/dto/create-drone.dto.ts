import { ContextDto } from './context.dto';

export class CreateDroneDto extends ContextDto {
  userId: number;
  droneId: number;
}
