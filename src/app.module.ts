import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middleswares/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import mongoose from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(), // for .env
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        user: configService.get<string>('MONGO_USERNAME'),
        pass: configService.get<string>('MONGO_PASSWORD'),
        dbName: configService.get<string>('MONGO_DBNAME'),
      }),
      inject: [ConfigService],
    }),
    CatsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// https://docs.nestjs.com/middleware#applying-middleware
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('api/v1');
    // to show mongodb log in dev
    mongoose.set('debug', this.isDev);
  }
}
