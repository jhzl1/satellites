import { Module } from '@nestjs/common';
import { TopsecretController } from './topsecret.controller';
import { SatellitesService } from 'src/services/satellites/satellites.service';

@Module({
  controllers: [TopsecretController],
  providers: [SatellitesService],
})
export class TopsecretModule {}
