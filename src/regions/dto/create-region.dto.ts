import { ApiProperty } from '@nestjs/swagger';

export class CreateRegionDto {
  @ApiProperty({
    description: 'The name of the region',
    example: 'Tashkent',
  })
  name: string;

  @ApiProperty({
    example: '39.650088423143096',
    description: 'longitude',
  })
  longitude: string;

  @ApiProperty({
    example: '66.95550887064353',
    description: 'latitude',
  })
  latitude: string;
}
