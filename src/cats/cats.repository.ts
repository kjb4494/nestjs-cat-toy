import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schema';
import { Model, Types } from 'mongoose';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findAll(): Promise<Array<Cat>> {
    const cats = await this.catModel.find();
    return cats;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.catModel.exists({ email });
    return !!result;
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async findCatByIdWithoutPassword(
    id: string | Types.ObjectId,
  ): Promise<Cat | null> {
    // valid id
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    // select without password
    const cat = await this.catModel.findById(id).select('-password');
    return cat;
  }

  async findByIdAndUpdateImg(id: string | Types.ObjectId, fileName: string) {
    // valid id
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    const cat = await this.catModel.findById(id);
    cat.imgUrl = `${process.env.MEDIA_PATH}${fileName}`;
    const newCat = await cat.save();
    return newCat.readOnlyData;
  }
}
