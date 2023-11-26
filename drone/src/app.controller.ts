import { Controller, Inject, OnModuleInit, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { FlightTaskDto } from './dto/flightTaskDto';
import { AuthInterceptor } from './interceptor/auth/auth.interceptor';


@Controller()
@UseInterceptors(AuthInterceptor)
export class AppController implements OnModuleInit {
  constructor(
    @Inject('FLIGHT_PLANNING_SERVICE') private readonly flightPlanningService: ClientKafka,
    @Inject('AUTH_SERVICE') private readonly authService: ClientKafka,
    @Inject('AIR_TRAFFIC_MANAGER_SERVICE') private readonly atm: ClientKafka,
    private readonly appService: AppService,
  ) {
  }

  public onModuleInit(): void {
    this.authService.subscribeToResponseOf('auth_verify_token');
    this.atm.subscribeToResponseOf('atm_register_bvs');
    this.atm.subscribeToResponseOf('atm_set_info_geo');
    this.flightPlanningService.subscribeToResponseOf('fp_set_info_telemetry');
  }

  @MessagePattern('drone_set_flight_task')
  public async setFlightTask(@Payload() message: FlightTaskDto) {
    return await this.appService.setFlightTask(message);
  }
}
