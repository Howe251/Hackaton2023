import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: ClientKafka,) {
  }

  public canActivate(
    context: ExecutionContext,
  ): Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = this.extractTokenFromHeaders(request);

    if (!accessToken) {
      throw new UnauthorizedException();
    }

    return this.authService.send('auth_verify_token', { accessToken })
      .pipe(map((response) => response.success))
  }

  private extractTokenFromHeaders(request: Request): string | null {
    const accessToken = request.headers['access-token'];

    return accessToken ?? null;
  }
}
