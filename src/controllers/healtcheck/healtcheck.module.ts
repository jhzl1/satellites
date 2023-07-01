import { Module } from '@nestjs/common';
import { HealtcheckController } from './healtcheck.controller';

@Module({
  controllers: [HealtcheckController],
})
export class HealtcheckModule {}
