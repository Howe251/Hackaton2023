import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientKafka } from '@nestjs/microservices';
export declare class AuthInterceptor implements NestInterceptor {
    private readonly authService;
    constructor(authService: ClientKafka);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
