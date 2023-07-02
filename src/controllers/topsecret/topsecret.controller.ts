import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseArrayPipe,
  Post,
} from '@nestjs/common';
import { SatellitesService } from 'src/services/satellites/satellites.service';
import {
  BaseMessagesAndSatellites,
  MessagesAndSatellitesWithRequiredName,
} from './dto/messages-and-satellites.dto';
import { Satellites } from './interfaces/satellites.interface';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SatellitePosition } from './entities/satellite-position';

@ApiTags('Satellites')
@Controller()
export class TopsecretController {
  constructor(private readonly satellitesService: SatellitesService) {}

  @Post('topsecret')
  @ApiBody({
    type: MessagesAndSatellitesWithRequiredName,
    isArray: true,
    required: true,
  })
  @ApiResponse({ status: 404, description: 'Bad request' })
  @ApiResponse({ status: 200, type: SatellitePosition })
  setSatellitesAndMessages(
    @Body(
      new ParseArrayPipe({
        items: MessagesAndSatellitesWithRequiredName,
        exceptionFactory: () =>
          new NotFoundException(
            'No se pueda determinar la posición o el mensaje',
          ),
      }),
    )
    body: MessagesAndSatellitesWithRequiredName[],
  ) {
    return this.satellitesService.getLocation(body);
  }

  @Get('topsecret_split/:satellite_name')
  @ApiResponse({ status: 200, description: 'OK', type: SatellitePosition })
  @ApiResponse({
    status: 404,
    description: 'Bad request',
  })
  getSatellitePosition(
    @Param('satellite_name')
    satelliteName: Satellites,
  ) {
    this.satellitesService.validateSatelliteName(satelliteName);

    return this.satellitesService.getMessage();
  }

  @Post('topsecret_split/:satellite_name')
  @ApiResponse({ status: 200, description: 'OK', type: SatellitePosition })
  @ApiResponse({
    status: 404,
    description: 'Bad request',
  })
  updateSatelliteInfo(
    @Param('satellite_name')
    satelliteName: Satellites,
    @Body() body: BaseMessagesAndSatellites,
  ) {
    this.satellitesService.validateSatelliteName(satelliteName);

    return this.satellitesService.updatePositionAndMessage(satelliteName, body);
  }
}
