import { ApiProperty } from '@nestjs/swagger';
import { LoginParamsVm } from './login-params.vm';

export class RegisterParamsVm extends LoginParamsVm {
  @ApiProperty() firstName: string;
  @ApiProperty() lastName: string;
}
