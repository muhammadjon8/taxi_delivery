import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './src/app.module';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT || 5000;
async function start() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Taxi va Yuk tashish xizmati')
    .setDescription('Har qanday joydan eshigingiz oldigacha')
    .setVersion('1.0')
    .addTag('taxi_delivery')
    .build();
  app.enableCors({
    origin: ['*'], // Replace with your allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed methods
    allowedHeaders: 'Content-Type, Accept, Authorization', // Specify allowed headers
    credentials: true, // Allow cookies to be sent with requests
  });
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  app.use(cookieParser());

  await app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

start();
