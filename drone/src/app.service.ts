import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { TelemetryDto } from './dto/telemetry.dto';
import { GPSDto } from './dto/GPS.dto';
import { Flightplan } from './dto/flightplan.dto';
import {firstValueFrom} from 'rxjs';


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
    
    this.sendPlanBVS(data);
    console.log('данные Отправлены в ОрВД');
    return {"success": this.takeoff};
  }

  public async sendPlanBVS (data: Flightplan) {
    console.log("HERE");
    console.log(this.tasklist[this.tasklist.length-1]);
    let task = this.tasklist[this.tasklist.length-1];
    
    const vl = await firstValueFrom(
      this.atm.send("atm_register_bvs", {id: task.id, accessToken: task.accessToken}));
    console.log(vl);
    this.takeoff = vl.success;
    this.takeoff ? console.log("Вылет разрешён") : console.log("Вылет запрещен");
  }

  executeCommand(data: any) {
    console.log(data);
    if (this.takeoff) {
      console.log("Получена команда");
    }
    if (this.takeoff) {return {success: this.takeoff, message: "Команда выполнена"}} 
    else { return {success: this.takeoff, error: "Полёт был запрещен ОРВД. Данные недоступны"}}
    // return data;
  }

  executeAlarmCommand(data: any) {
    if (this.takeoff) {
      console.log("Получена экстренная команда");
      
      console.log(data.command);

      return {success: true, message: "Команда выполнена"};
    }
    console.log({success:false, error: "Полёт был запрещен. Команда недоступна"});
    return {success:false, error: "Полёт был запрещен. Команда недоступна"};
  }

  sendGPS() {
    const g =this.getGPSPos();
    this.atm.emit('atm_set_info_geo', g);
  }

  sendTelemetry() {
    const t = new TelemetryDto;
    t.compasDeg = 100;
    t.distanceToHome = 20;
    t.position = this.getGPSPos();
    t.satCount = 12;
    t.speed = 10;
    this.flightPlanningService.emit('', t); //ДОБАВИТЬ ПУТЬ
  }

  sendEndTask() {
    let task = this.tasklist[this.tasklist.length-1];
    this.takeoff = false;
    this.tasklist.pop();
    this.flightPlanningService.emit('', {'TaskEnd': true, "accessToken": task.accessToken}); //Добавить путь и токен
  }

  getGPSPos() {
    const g = new GPSDto;
    g.x = Math.random()*10;
    g.y = Math.random()*10;
    return g;
  }
  // getHello(): string {
  //   return 'Hello World!';
  // }
}
