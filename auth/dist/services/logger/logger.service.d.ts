import { ClientKafka } from '@nestjs/microservices';
export declare class LoggerService {
    private readonly loggerService;
    private readonly producer;
    constructor(loggerService: ClientKafka);
    log(topic: string, message: any): void;
}
