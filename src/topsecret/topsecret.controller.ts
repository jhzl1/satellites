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

@Controller()
export class TopsecretController {
  constructor(private readonly satellitesService: SatellitesService) {}

  @Post('topsecret')
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
  getSatellitePosition(
    @Param('satellite_name')
    satelliteName: Satellites,
  ) {
    this.satellitesService.validateSatelliteName(satelliteName);

    return this.satellitesService.getMessage();
  }

  @Post('topsecret_split/:satellite_name')
  updateSatelliteInfo(
    @Param('satellite_name')
    satelliteName: Satellites,
    @Body() body: BaseMessagesAndSatellites,
  ) {
    this.satellitesService.validateSatelliteName(satelliteName);

    return this.satellitesService.updatePositionAndMessage(satelliteName, body);
  }
}
