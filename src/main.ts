import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { SuccessInterceptor } from './common/interceptors/success.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as expressBasicAuth from 'express-basic-auth';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // https://github.com/LionC/express-basic-auth?tab=readme-ov-file#how-to-use
  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  // https://docs.nestjs.com/openapi/introduction#bootstrap
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // docs: endpoint

  // for static files (needs NestExpressApplication)
  // ex) http://localhost:3000/media/cats/aaa.jpg
  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    prefix: '/media',
  });

  // https://docs.nestjs.com/pipes#global-scoped-pipes
  app.useGlobalPipes(new ValidationPipe());

  // https://docs.nestjs.com/exception-filters#binding-filters
  app.useGlobalFilters(new HttpExceptionFilter());

  // https://docs.nestjs.com/interceptors#binding-interceptors
  app.useGlobalInterceptors(new SuccessInterceptor());

  // https://docs.nestjs.com/security/cors
  // options: https://github.com/expressjs/cors?tab=readme-ov-file#configuration-options
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
