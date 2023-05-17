import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';


import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { config } from 'dotenv';
require('dotenv').config({ path: `../.env` });
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '../../', 'public'));
  app.setBaseViewsDir(join(__dirname, '../../', 'views'));
  app.setViewEngine('ejs');

  await app.listen(3030);
}
bootstrap();