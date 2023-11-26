import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { VerifyTokenDto } from './dto/verify-token.dto';
import { LoggerService } from './services/logger/logger.service';
export declare class AppService {
    private jwtService;
    private logger;
    constructor(jwtService: JwtService, logger: LoggerService);
    login({ email, password }: LoginDto): any;
    verifyToken({ accessToken }: VerifyTokenDto): {
        success: boolean;
        user: any;
        error?: undefined;
    } | {
        success: boolean;
        error: UnauthorizedException;
        user?: undefined;
    };
}
