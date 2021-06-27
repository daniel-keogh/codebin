import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  private options: TypeOrmModuleOptions = {
    ssl: this.isProduction,
    extra: {
      ssl: this.isProduction ? { rejectUnauthorized: false } : null,
    },
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
  };

  private get isProduction() {
    return process.env.NODE_ENV === 'production';
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return this.options;
  }
}
