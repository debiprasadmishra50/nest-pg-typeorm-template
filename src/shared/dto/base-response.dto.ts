import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T = any> {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ description: 'Response data', required: true })
  data: T;
}

export class CountResposeDto {
  @ApiProperty({ description: 'Response Count', required: true })
  count: number;
}
