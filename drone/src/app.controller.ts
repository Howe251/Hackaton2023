import { Controller, Get, Inject, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, Ctx, KafkaContext, Payload, MessagePattern } from '@nestjs/microservices';
import { Flightplan } from './dto/flightplan.dto';
import { Command } from './dto/command.dto';
import { AuthInterceptor } from './interceptor/auth/auth.interceptor';
import { log } from 'console';


@Controller()
@UseInterceptors(AuthInterceptor)
export class AppController {
  constructor(private readonly appService: AppService,
  @Inject('FLIGHT_PLANNING_SERVICE') private readonly flightPlanningService: ClientKafka,
  @Inject('AUTH_SERVICE') private readonly authService: ClientKafka,
  @Inject('AIR_TRAFFIC_MANAGER') private readonly atm: ClientKafka
) {}

public onModuleInit(): void {
  this.authService.subscribeToResponseOf('auth_verify_token');
  this.atm.subscribeToResponseOf('atm_register_bvs');
  this.flightPlanningService.subscribeToResponseOf('drone_command');
  this.atm.subscribeToResponseOf('drone_command_alarm');
  // this.flightPlanningService.subscribeToResponseOf('setTask');
  
  // this.orvd.subscribeToResponseOf('drone_command_alarm');
  // this.orvd.subscribeToResponseOf('drone_submit_take_off');
}

  @MessagePattern('drone_set_flight_plan')
  public setplan(@Payload() message: Flightplan) {
    return this.appService.setGetTaskHandler(message);
  }

  @MessagePattern('drone_command')
  public executeCom(@Payload() message: Command) {
    return this.appService.executeCommand(message);
  }

  @MessagePattern('drone_alarm_command')
  public executeAlarmCom(@Payload() message: Command) {
    return this.appService.executeAlarmCommand(message);
  }
}
