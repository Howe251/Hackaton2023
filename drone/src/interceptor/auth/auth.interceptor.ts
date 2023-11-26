import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor, UnauthorizedException
} from '@nestjs/common';
import { firstValueFrom, Observable, of } from 'rxjs';
import { ClientKafka } from '@nestjs/microservices';
import { LoggerService } from 'src/services/logger/logger.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientKafka,
    private readonly loggerService: LoggerService,
  ) {
  }

  public async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const message = context.switchToRpc().getData();
    const authResponse = await firstValueFrom(this.authService.send('auth_verify_token', message));

    if (!authResponse.success) {
      const response = {
        success: false,
        error: new UnauthorizedException(),
      };

      this.loggerService.log('auth_interceptor', response);
      return of(response);
    }

    return next.handle();
  }
}
