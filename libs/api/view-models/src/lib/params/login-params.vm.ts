import { ApiProperty } from '@nestjs/swagger';

export class LoginParamsVm {
  @ApiProperty() email: string;
  @ApiProperty() password: string;
}
