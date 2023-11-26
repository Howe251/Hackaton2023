import { Injectable, UnauthorizedException } from '@nestjs/common';
import { userDb } from './db/user.db';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { VerifyTokenDto } from './dto/verify-token.dto';
import { LoggerService } from './services/logger/logger.service';

@Injectable()
export class AppService {
  constructor(
    private jwtService: JwtService,
    private logger: LoggerService,
  ) {
  }

  public login({ email, password }: LoginDto) {
    const user = userDb.getUserByEmail(email);
    let response;

    if (user && userDb.isCorrectPassword(user, password)) {
      const payload = { email: user.email, id: user.id, name: user.name };

      response = {
        success: true,
        accessToken: this.jwtService.sign(payload),
      }

      this.logger.log('auth_login', response);

      return response;
    }

    response =  {
      success: false,
      error: new UnauthorizedException(),
    }

    this.logger.log('auth_login', response);

    return response;
  }

  public verifyToken({ accessToken }: VerifyTokenDto) {
    try {
      const user = this.jwtService.verify(accessToken);

      return {
        success: true,
        user,
      }
    } catch (e) {
      return {
        success: false,
        error: new UnauthorizedException(),
      }
    }
  }
}
