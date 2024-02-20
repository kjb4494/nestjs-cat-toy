import { OmitType, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

// cf. Remove only unnecessary fields using OmitType
// export class CatRequestDto extends OmitType(Cat, ['imgUrl'] as const) {}

// Use only the fields you need using PickType
export class CatRequestDto extends PickType(Cat, [
  'email',
  'password',
  'name',
] as const) {}
