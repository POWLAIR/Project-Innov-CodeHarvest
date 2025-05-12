import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: [process.env.NEXT_PUBLIC_API_URL, process.env.NEXT_PUBLIC_API_URL + '/signin', process.env.NEXT_PUBLIC_API_URL + '/login', 'http://localhost:3000'],
    credentials: true,
  });

  await app.listen(3001);
}
bootstrap();
