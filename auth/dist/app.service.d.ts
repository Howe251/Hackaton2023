import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { VerifyTokenDto } from './dto/verify-token.dto';
export declare class AppService {
    private jwtService;
    constructor(jwtService: JwtService);
    login({ email, password }: LoginDto): {
        success: boolean;
        accessToken: string;
        error?: undefined;
    } | {
        success: boolean;
        error: UnauthorizedException;
        accessToken?: undefined;
    };
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
