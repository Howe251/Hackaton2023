import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ClientKafka } from '@nestjs/microservices';
import { LoggerService } from '../../services/logger/logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientKafka,
    private readonly logger: LoggerService,
    ) {
  }

  public canActivate(
    context: ExecutionContext,
  ): Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = this.extractTokenFromHeaders(request);

    if (!accessToken) {
      const exception = new UnauthorizedException();
      this.logger.log('auth_guard', exception);
      throw exception
    }

    return this.authService.send('auth_verify_token', { accessToken })
      .pipe(
        map((response) => response.success),
      )
  }

  private extractTokenFromHeaders(request: Request): string | null {
    const accessToken = request.headers['access-token'];

    return accessToken ?? null;
  }
}
