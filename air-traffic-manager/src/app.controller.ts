import {
  Controller,
  Inject,
  OnModuleInit,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  ClientKafka,
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { AuthInterceptor } from './interceptor/auth/auth.interceptor';

@Controller()
@UseInterceptors(AuthInterceptor)
export class AppController implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientKafka,
    private readonly appService: AppService,
  ) {}

  public onModuleInit(): void {
    this.authService.subscribeToResponseOf('auth_verify_token');
  }

  @MessagePattern('atm_approve_task')
  approveTask(@Payload() data: any,) {
    return this.appService.approveTaskHandler(data);
  }

  @MessagePattern('atm_register_bvs')
  registerBvsHandler(@Payload() data: any) {
    return this.appService.registerBvsHandler(data);
  }

  @MessagePattern('atm_set_info_geo')
  SetInfoGeoHandler(@Payload() data: any) {
    return this.appService.SetInfoGeoHandler(data);
  }

  @MessagePattern('atm_set_mission_complete')
  setMissionComplete(@Payload() data: any) {
    return this.appService.setMissionComplete(data);
  }
}
