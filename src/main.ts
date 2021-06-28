import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { TooManyRequestsException } from './common/exceptions/too-many-requests.exception';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

import * as dotenv from 'dotenv';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const port = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new TransformInterceptor());

  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 30 * 1000,
      max: 25,
      handler: () => {
        throw new TooManyRequestsException();
      },
    }),
  );

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Codebin API Documetation')
    .setDescription('Code sharing service made with NestJS.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);

  Logger.log(`Server listening on port ${port}.`, 'Bootstrap');
}

dotenv.config();
bootstrap();
