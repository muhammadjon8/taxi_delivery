import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateRegionDto } from './create-region.dto';

export class UpdateRegionDto extends PartialType(CreateRegionDto) {
  // @ApiProperty({
  //   description: 'The name of the region',
  //   example: 'Tashkent',
  //   required: false, 
  // })
  // name: string;
}
