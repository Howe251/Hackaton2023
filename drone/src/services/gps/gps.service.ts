import { Injectable } from '@nestjs/common';
import { GPSDto } from '../../dto/GPS.dto';

@Injectable()
export class GpsService {
  public getGPSPos(): GPSDto {
    const gps = new GPSDto;

    gps.x = Math.floor(Math.random() * 10);
    gps.y = Math.floor(Math.random() * 10);

    return gps;
  }
}
