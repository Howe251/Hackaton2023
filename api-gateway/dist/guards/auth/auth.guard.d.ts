import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientKafka } from '@nestjs/microservices';
export declare class AuthGuard implements CanActivate {
    private readonly authService;
    constructor(authService: ClientKafka);
    canActivate(context: ExecutionContext): Observable<boolean>;
    private extractTokenFromHeaders;
}
