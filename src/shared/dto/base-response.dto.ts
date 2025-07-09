import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T = any> {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ description: 'Response data', required: true })
  data: T;

  @ApiProperty({ description: 'Error message', required: false })
  message?: string;
}
