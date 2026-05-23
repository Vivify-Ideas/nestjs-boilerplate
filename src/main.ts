import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { TrimStringsPipe } from './modules/common/transformer/trim-strings.pipe';
import { ConfigService } from './modules/config';
import { AppModule } from './modules/main/app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);

  const configService = app.get(ConfigService);
  const corsAllowOrigin = configService.get('CORS_ALLOW_ORIGIN');

  if (!corsAllowOrigin && !configService.isEnv('dev')) {
    throw new Error('CORS_ALLOW_ORIGIN must be set outside dev');
  }

  app.enableCors({
    origin: corsAllowOrigin
      ? corsAllowOrigin.split(',').map((origin) => origin.trim())
      : true,
    credentials: true,
  });

  app.useGlobalPipes(new TrimStringsPipe(), new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3000);
}
bootstrap();
