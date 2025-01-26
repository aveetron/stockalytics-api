import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
        }));
        throw new BadRequestException(formattedErrors);
      },
    }),
  );

  await app
    .listen(process.env.PORT || 3000)
    .then(() => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    })
    .catch((e) => console.log(e));
}
bootstrap();
