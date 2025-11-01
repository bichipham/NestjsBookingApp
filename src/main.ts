import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './common/constant/app.constant';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ResponseSuccessInterceptor } from './common/interceptors/response-success.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ProtectGuard } from './common/guard/protect/protect.guard';
import { RolesGuard } from './common/guard/protect/role.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ResponseSuccessInterceptor(reflector));
  app.useGlobalGuards(new ProtectGuard(reflector), new RolesGuard(reflector));
  
  const config = new DocumentBuilder()
    .setTitle('Cyber Community')
    .setDescription('Cyber Community description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory, {
    swaggerOptions: { persistAuthorization: true },
  });

  const logger = new Logger('Bootstrap');
  await app.listen(PORT ?? 3000, () => {
    logger.log(`Application is running on: http://localhost:${PORT}/api`);
  });
}
bootstrap();
