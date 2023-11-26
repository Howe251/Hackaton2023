import { Body, Controller, Get, HttpStatus, Inject, OnModuleInit, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { TestCommandDto } from './test-command.dto';
import { ClientKafka, Ctx } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth/auth.guard';
import { setContext } from './utils/set-context.utils';

@Controller('')
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    @Inject('FLIGHT_PLANNING_SERVICE') private readonly flightPlanningService: ClientKafka,
    @Inject('AUTH_SERVICE') private readonly authService: ClientKafka,
  ) {}

  onModuleInit(): void {
    this.flightPlanningService.subscribeToResponseOf('test_command');
    this.authService.subscribeToResponseOf('auth_login');
    this.authService.subscribeToResponseOf('auth_verify_token');
  }

  @UseGuards(AuthGuard)
  @Post('test-command')
  testCommand(@Body() body: TestCommandDto, @Ctx() headers: any) {
    return this.appService.testCommand(setContext(body, headers));
  }

  @Post('auth/login')
  login(@Body() body: LoginDto) {
    return this.appService.login(body);
  }
}
