import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'dist'),
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ServerErrorFilter,
    },
  ],
})
export class AppModule {}
