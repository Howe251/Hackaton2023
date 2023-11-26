import { AppService } from './app.service';
import { LoginDto } from './dto/login.dto';
import { VerifyTokenDto } from './dto/verify-token.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    login(message: LoginDto): {
        success: boolean;
        accessToken: string;
        error?: undefined;
    } | {
        success: boolean;
        error: import("@nestjs/common").UnauthorizedException;
        accessToken?: undefined;
    };
    verifyToken(message: VerifyTokenDto): {
        success: boolean;
        user: any;
        error?: undefined;
    } | {
        success: boolean;
        error: import("@nestjs/common").UnauthorizedException;
        user?: undefined;
    };
}
