import { Module } from '@nestjs/common';
import { TopsecretModule } from './controllers/topsecret/topsecret.module';
import { HealtcheckModule } from './controllers/healtcheck/healtcheck.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TopsecretModule,
    HealtcheckModule,
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
