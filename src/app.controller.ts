import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Return object as json
  /*
  @Get()
  getHello(): {name: string} {
    return {name: 'Jarkko'};
  }
  */

}
