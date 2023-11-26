import { Injectable, UnauthorizedException } from '@nestjs/common';
import { userDb } from './db/user.db';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { VerifyTokenDto } from './dto/verify-token.dto';

@Injectable()
export class AppService {
  constructor(private jwtService: JwtService) {
  }

  public login({ email, password }: LoginDto) {
    const user = userDb.getUserByEmail(email);

    if (user && userDb.isCorrectPassword(user, password)) {
      const payload = { email: user.email, id: user.id, name: user.name };

      return {
        success: true,
        accessToken: this.jwtService.sign(payload),
      }
    }

    return {
      success: false,
      error: new UnauthorizedException(),
    }
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
