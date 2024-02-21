import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Comments extends Document {
  @ApiProperty({
    example: '65d4757a24f6d39cac974905',
    description: '댓글 작성자 object id',
    required: true,
  })
  @Prop({
    type: Types.ObjectId, // mongodb auto generated id
    required: true,
    ref: 'cats',
  })
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({
    example: '안녕하세요!',
    description: '댓글 컨텐츠',
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contents: string;

  @ApiProperty({
    example: 1,
    description: '좋아요 수',
  })
  @Prop({
    default: 0,
  })
  @IsPositive()
  likeCount: number;

  @ApiProperty({
    example: '65d4757a24f6d39cac974905',
    description: '작성 대상 (게시물, 정보글)',
    required: true,
  })
  @Prop({
    type: Types.ObjectId, // mongodb auto generated id
    required: true,
    ref: 'cats',
  })
  @IsNotEmpty()
  info: Types.ObjectId;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
