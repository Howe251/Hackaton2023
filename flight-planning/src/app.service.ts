import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
  constructor(
  ) {
  }

  testCommandHandler(data: any) {
    return { success: true, message: `${data.command} received` };
  }
}
