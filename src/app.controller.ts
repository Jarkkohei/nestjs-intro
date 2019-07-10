import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  //@Header('Content-Type', 'text/html')
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
