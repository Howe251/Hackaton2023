import { ContextDto } from './context.dto';

export class LoginDto extends ContextDto {
  email: string;
  password: string;
}
