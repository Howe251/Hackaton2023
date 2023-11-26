import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientKafka } from '@nestjs/microservices';
import { LoggerService } from '../../services/logger/logger.service';
export declare class AuthGuard implements CanActivate {
    private readonly authService;
    private readonly logger;
    constructor(authService: ClientKafka, logger: LoggerService);
    canActivate(context: ExecutionContext): Observable<boolean>;
    private extractTokenFromHeaders;
}
