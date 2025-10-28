import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './common/constant/app.constant';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const logger = new Logger('Bootstrap');

  await app.listen(PORT ?? 3000, () => {
    logger.log(`Application is running on: http://localhost:${PORT}/api`);
  });
}
bootstrap();
