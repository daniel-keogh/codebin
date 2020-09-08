import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';
import { TooManyRequestsException } from './common/exceptions/too-many-requestsexception';

import * as dotenv from 'dotenv';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const port = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }

  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 30 * 1000,
      max: 10,
      handler: () => {
        throw new TooManyRequestsException();
      },
    }),
  );

  await app.listen(port);

  Logger.log(`Server listening on port ${port}.`, 'Bootstrap');
}

dotenv.config();
bootstrap();
