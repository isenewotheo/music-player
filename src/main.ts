import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CustomValidationExceptionFilter} from './filters/CustomValidationException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Automatically strips properties that do not have decorators
      forbidNonWhitelisted: true, // Throws an error if any extra properties are provided
      transform: true, // Automatically transforms the payload to the expected DTO class
    }),
  );
  app.useGlobalFilters(new CustomValidationExceptionFilter())
app.setGlobalPrefix("/api")
  await app.listen(6000);
  
  
  
  
  
  const server = app.getHttpServer();
  const router = server._events.request._router;
  const availableRoutes: [] = router.stack
    .map(layer => {
      if (layer.route) {
        return {
          route: {
            path: layer.route?.path,
            method: layer.route?.stack[0].method,
          },
        };
      }
    })
    .filter(item => item !== undefined);
  // console.log(availableRoutes);
}
bootstrap();
