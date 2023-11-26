import { Body, Controller, Inject, OnModuleInit, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, Ctx } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth/auth.guard';
import { setContext } from './utils/set-context.utils';
import { CreateDroneDto } from './dto/create-drone.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetInfoDto } from './dto/get-info.dto';

@Controller('api/v1/')
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    @Inject('FLIGHT_PLANNING_SERVICE') private readonly flightPlanningService: ClientKafka,
    @Inject('AUTH_SERVICE') private readonly authService: ClientKafka,
  ) {}

  public onModuleInit(): void {
    this.flightPlanningService.subscribeToResponseOf('test_command');
    this.authService.subscribeToResponseOf('auth_login');
    this.authService.subscribeToResponseOf('auth_verify_token');
    this.flightPlanningService.subscribeToResponseOf('fp_select_drone');
    this.flightPlanningService.subscribeToResponseOf('fp_create-task');
    this.flightPlanningService.subscribeToResponseOf('fp_get_info');

  }

  @Post('auth/login')
  login(@Body() body: LoginDto) {
    return this.appService.login(body);
  }

  @UseGuards(AuthGuard)
  @Post('select-drone')
  selectDrone(@Body() body: CreateDroneDto, @Ctx() headers: any) {
    return this.appService.selectDrone(setContext(body, headers));
  }

  @UseGuards(AuthGuard)
  @Post('create-task')
  createTask(@Body() body: CreateTaskDto, @Ctx() headers: any) {
    return this.appService.createTask(setContext(body, headers));
  }

  @UseGuards(AuthGuard)
  @Post('get-info')
  getInfo(@Body() body: GetInfoDto, @Ctx() headers: any) {
    return this.appService.getInfo(setContext(body, headers));
  }
}
