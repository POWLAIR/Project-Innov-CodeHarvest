import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Autoriser toutes les origines
  app.enableCors({
    origin: '*', // Permet à toutes les origines d'accéder à votre API
    credentials: true, // Permet d'envoyer des cookies et d'autres informations d'authentification
  });

  await app.listen(3001); // Assurez-vous que votre application écoute sur le bon port
}
bootstrap();
