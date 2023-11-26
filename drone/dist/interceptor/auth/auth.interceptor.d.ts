import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientKafka } from '@nestjs/microservices';
import { LoggerService } from 'src/services/logger/logger.service';
export declare class AuthInterceptor implements NestInterceptor {
    private readonly authService;
    private readonly loggerService;
    constructor(authService: ClientKafka, loggerService: LoggerService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
