import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Telemetry } from './dto/telemetry.dto';
import { GPS } from './dto/GPS.dto';
import { Flightplan } from './dto/flightplan.dto';
import {firstValueFrom} from 'rxjs';
import { log } from 'console';


@Injectable()
export class AppService {
  private readonly tasklist: Flightplan[] = [];
  private takeoff: boolean;

  constructor(
    @Inject('AIR_TRAFFIC_MANAGER') private readonly atm: ClientKafka,
    @Inject('FLIGHT_PLANNING_SERVICE') private readonly flightPlanningService: ClientKafka,
    // @Inject('GPS')private GPS: GPS,
    // @Inject('Telemetry')private Telemetry: Telemetry,
    ) {}

  setGetTaskHandler(data: any) {
    console.log(data);
    this.tasklist.push(data);
    // console.log(this.tasklist);
    // console.log('данные записаны');
    console.log({"id":data.flightplan, "accessToken":data.accessToken});
    
    this.sendPlanBVS(data, data.accessToken);
    console.log('данные Отправлены в ОрВД');
    return true;
  }

  public async sendPlanBVS (data: Flightplan, accessToken: string) {
    console.log("HERE");
    const vl = await firstValueFrom(this.atm.send("atm_register_bvs", {"id":data.flightplan, "accessToken": accessToken}));
    console.log(vl);
    this.takeoff = vl.success;
    this.takeoff ? console.log("Вылет разрешён") : console.log("Вылет запрещен");
  }

  executeCommand(data: any) {
    console.log(data);
    return data;
  }

  executeAlarmCommand(data: any) {
    if (this.takeoff) {
      console.log("Экстренная команда");
      
      console.log(data);
      return data;
    }
  }

  sendGPS() {
    const g =this.getGPSPos();
    this.atm.emit('atm_set_info_geo', g);
  }

  sendTelemetry() {
    const t = new Telemetry;
    t.compasDeg = 100;
    t.distanceToHome = 20;
    t.position = this.getGPSPos();
    t.satCount = 12;
    t.speed = 10;
    this.flightPlanningService.emit('', t); //ДОБАВИТЬ ПУТЬ
  }

  sendEndTask() {
    this.flightPlanningService.emit('', {'TaskEnd': true, "accessToken": ""}); //Добавить путь и токен
  }

  getGPSPos() {
    const g = new GPS;
    g.x = Math.random()*10;
    g.y = Math.random()*10;
    return g;
  }
  // getHello(): string {
  //   return 'Hello World!';
  // }
}
