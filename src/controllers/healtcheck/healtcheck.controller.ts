import { Controller, Get } from '@nestjs/common';

@Controller('healtcheck')
export class HealtcheckController {
  @Get()
  healthyCheck() {
    return 'Im alive!';
  }
}
