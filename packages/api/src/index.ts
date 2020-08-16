import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.NODE_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();

process.on('SIGINT', function () {
  process.exit();
});
