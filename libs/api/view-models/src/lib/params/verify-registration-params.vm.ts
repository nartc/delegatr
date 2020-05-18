import { ApiProperty } from '@nestjs/swagger';

export class VerifyRegistrationParamsVm {
  @ApiProperty()
  token: string;
}
