import { Controller, Inject, OnModuleInit, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { AuthInterceptor } from './auth/auth.interceptor';

@Controller()
@UseInterceptors(AuthInterceptor)
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private readonly authService: ClientKafka
  ) {}

  public onModuleInit(): void {
    this.authService.subscribeToResponseOf('auth_verify_token');
  }

  @MessagePattern('test_command')
  testCommandHandler(@Payload() message: any, @Ctx() context: KafkaContext) {
    return this.appService.testCommandHandler(message);
  }
}
