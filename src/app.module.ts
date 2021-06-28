import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { PastesModule } from './pastes/pastes.module';
import { RawModule } from './raw/raw.module';
import { TypeOrmConfig } from './config/typeorm.config';
import { ServerErrorFilter } from './common/filters/server-error.filter';

@Module({
  imports: [
    AuthModule,
    PastesModule,
    RawModule,
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'dist'),
      exclude: ['/api*'],
    }),
    ThrottlerModule.forRootAsync({
      useFactory: () => ({
        ttl: +process.env.RATE_LIMIT_SECS,
        limit: +process.env.RATE_LIMIT_MAX,
      }),
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ServerErrorFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
