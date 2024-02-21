import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';
import { Comments } from 'src/comments/comments.schema';

const options: SchemaOptions = {
  timestamps: true,
  collection: 'cats',
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: 'test@example.com',
    description: 'email',
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '고양이',
    description: 'name',
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '1q2w3e4r5t',
    description: 'password',
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'tmp',
    description: 'image url',
  })
  @Prop({
    default:
      'https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg',
  })
  @IsString()
  imgUrl: string;

  // virtual field
  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
    comments: Comments[];
  };

  readonly comments: Comments[];
}

export const _CatSchema = SchemaFactory.createForClass(Cat);

// virtual data to filter password
_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    comments: this.comments,
  };
});

// virtual data added comments
_CatSchema.virtual('comments', {
  ref: 'Comments', // MongooseModule.forFeature에서 사용하는 Comments.name 값과 일치해야함
  localField: '_id',
  foreignField: 'info',
});
_CatSchema.set('toObject', { virtuals: true });
_CatSchema.set('toJSON', { virtuals: true });

export const CatSchema = _CatSchema;
