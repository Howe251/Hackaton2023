import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor, UnauthorizedException
} from '@nestjs/common';
import { firstValueFrom, Observable, of } from 'rxjs';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientKafka
  ) {
  }

  public async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const message = context.switchToRpc().getData();
    const authResponse = await firstValueFrom(this.authService.send('auth_verify_token', message));

    if (!authResponse.success) {
      return of({
        success: false,
        error: new UnauthorizedException(),
      });
    }

    return next.handle();
  }
}
