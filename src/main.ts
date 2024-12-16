import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import swagger from './shared/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  swagger.configure(app);

  await app.listen(3000);
}
bootstrap();
