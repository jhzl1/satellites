import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Healtcheck')
@Controller('healtcheck')
export class HealtcheckController {
  @ApiResponse({ status: 200, description: 'OK', type: String })
  @Get()
  healthyCheck() {
    return 'Im alive!';
  }
}
