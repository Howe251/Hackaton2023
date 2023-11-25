import { OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, KafkaContext } from '@nestjs/microservices';
export declare class AppController implements OnModuleInit {
    private readonly appService;
    private readonly authService;
    constructor(appService: AppService, authService: ClientKafka);
    onModuleInit(): void;
    testCommandHandler(message: any, context: KafkaContext): {
        success: boolean;
        message: string;
    };
}
