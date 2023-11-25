import { Body, Inject, Injectable } from '@nestjs/common';
import { TestCommandDto } from './test-command.dto';
import { ClientKafka } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('FLIGHT_PLANNING_SERVICE') private readonly flightPlanningService: ClientKafka,
    @Inject('AUTH_SERVICE') private readonly authService: ClientKafka,
  ) {}

  public testCommand(data: TestCommandDto) {
    return this.flightPlanningService.send(
      'test_command',
      data,
    );
  }

  public login(data: LoginDto) {
    return this.authService.send('auth_login', data);
  }
}
