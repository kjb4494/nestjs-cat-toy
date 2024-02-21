import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentsCreateDto } from '../dto/comments.create.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comments } from '../comments.schema';
import { Model } from 'mongoose';
import { CatsRepository } from 'src/cats/cats.repository';
import { Cat } from 'src/cats/cats.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
    private readonly catsRepository: CatsRepository,
  ) {}

  async getAllComments(): Promise<Array<Comments>> {
    const comments = await this.commentsModel.find();
    return comments;
  }

  async createComment(
    id: string,
    currentCat: Cat,
    commentData: CommentsCreateDto,
  ): Promise<Comments> {
    const targetCat = await this.catsRepository.findCatByIdWithoutPassword(id);
    if (!targetCat) {
      throw new BadRequestException('고양이 정보가 없습니다.');
    }

    const { contents } = commentData;
    const newComment = new this.commentsModel({
      author: currentCat._id,
      contents,
      info: targetCat._id,
    });
    return await newComment.save();
  }

  async plusLike(id: string) {
    const comment = await this.commentsModel.findById(id);
    if (!comment) {
      throw new BadRequestException('고양이 정보가 없습니다.');
    }
    comment.likeCount += 1;
    return await comment.save();
  }
}
