import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  constructor() { }

  @Get('health')
  @Public()
  getHello() {
    return { status: 'UP' };
  }
}
