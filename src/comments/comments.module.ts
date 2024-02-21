import { Module } from '@nestjs/common';
import { CommentsService } from './services/comments.service';
import { CommentsController } from './controllers/comments.controller';
import { Comments, CommentsSchema } from './comments.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from 'src/cats/cats.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comments.name, schema: CommentsSchema },
    ]),
    CatsModule,
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
