import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { VerifyTokenDto } from './dto/verify-token.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('auth_login')
  public login(@Payload() message: LoginDto)  {
    return this.appService.login(message);
  }

  @MessagePattern('auth_verify_token')
  public verifyToken(@Payload() message: VerifyTokenDto)  {
    return this.appService.verifyToken(message);
  }
}
