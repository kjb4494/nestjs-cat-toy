import { Module, forwardRef } from '@nestjs/common';
import { CatsService } from './services/cats.service';
import { CatsController } from './controllers/cats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cats.schema';
import { CatsRepository } from './cats.repository';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    // https://docs.nestjs.com/techniques/file-upload#default-options
    MulterModule.register({
      dest: './upload',
    }),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    // https://docs.nestjs.com/fundamentals/circular-dependency#module-forward-reference
    forwardRef(() => AuthModule),
  ],
  providers: [CatsService, CatsRepository],
  controllers: [CatsController],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
