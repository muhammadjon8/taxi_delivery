import { ApiProperty } from '@nestjs/swagger';

export class CreateDistrictDto {
  @ApiProperty({
    description: 'Tumanning nomi',
    example: 'Yunusobod',
  })
  name: string;
}
