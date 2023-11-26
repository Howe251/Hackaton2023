import {
  Controller,
  Get,
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
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private readonly authService: ClientKafka,
  ) {}

  public onModuleInit(): void {
    console.log('onModuleInit');
    this.authService.subscribeToResponseOf('auth_verify_token');
  }

  @MessagePattern('atm_set_task')
  setTaskHandler(@Payload() data: any, @Ctx() context: KafkaContext) {
    return this.appService.setTaskHandler(data);
  }

  @MessagePattern('atm_register_bvs')
  registerBvsHandler(@Payload() data: any, @Ctx() context: KafkaContext) {
    return this.appService.registerBvsHandler(data);
  }

  @MessagePattern('atm_set_info_geo')
  SetInfoGeoHandler(@Payload() data: any, @Ctx() context: KafkaContext) {
    return this.appService.SetInfoGeoHandler(data);
  }

  @MessagePattern('atm_set_mission_complete')
  setMissionComplete(@Payload() data: any, @Ctx() context: KafkaContext) {
    return this.appService.setMissionComplete(data);
  }
}
