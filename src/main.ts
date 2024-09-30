import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useLogger(['error', 'warn', 'log'])
  
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  await app.listen(app.get(ConfigService).get<string>('port'));  
}
bootstrap();
