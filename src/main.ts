import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'Access-Control-Allow-Origin',
    ],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  await app
    .listen(process.env.PORT || 3000)
    .then(() => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    })
    .catch((e) => console.log(e));
}
bootstrap();
