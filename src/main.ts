import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
  .setTitle('Blog API')
  .setDescription('a blog api')
  .setVersion('1.0.0')
  .build()

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();
