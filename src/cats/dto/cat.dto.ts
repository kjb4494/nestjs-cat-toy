import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

// Use only the fields you need using PickType
export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '65d4b54c1f03b61c72a2c80e',
    description: 'id',
  })
  id: string;
}
