import { ApiProperty } from '@nestjs/swagger';

export class CreateRegionDto {
  @ApiProperty({
    description: 'The name of the region',
    example: 'Tashkent',
  })
  name: string;
}
