import { Injectable } from '@nestjs/common';
import { LoggerDto } from './dto/logger.dto';

@Injectable()
export class AppService {
  private readonly reset = '\x1b[0m';
  private readonly cyan = '\x1b[36m';
  private readonly yellow = '\x1b[33m';

  public log(data: LoggerDto): void {
    const prefix = this.getColoredPrefix(data);
    console.log(prefix, data.message);
  }

  private getColoredPrefix({ producer, topic }: LoggerDto): string {
    return `${this.getDateTime()} [${this.cyan}${producer}${this.reset}] ${this.yellow}${topic}${this.reset}: `;
  }

  private getDateTime(): string {
    const now = new Date();
    const date = now.toLocaleDateString('en-US');
    const time = now.toLocaleTimeString('en-US');

    return `${date}, ${time}`;
  }
}
