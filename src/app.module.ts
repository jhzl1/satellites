import { Module } from '@nestjs/common';
import { TopsecretModule } from './topsecret/topsecret.module';

@Module({
  imports: [TopsecretModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
