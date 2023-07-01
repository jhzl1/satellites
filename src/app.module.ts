import { Module } from '@nestjs/common';
import { TopsecretModule } from './controllers/topsecret/topsecret.module';
import { HealtcheckModule } from './controllers/healtcheck/healtcheck.module';

@Module({
  imports: [TopsecretModule, HealtcheckModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
