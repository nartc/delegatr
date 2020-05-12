import { BaseVm } from '@delegatr/api/common';
import { AutoMap } from 'nestjsx-automapper';
import { RoleVm } from '@delegatr/api/view-models';

export class AuthUser extends BaseVm {
  @AutoMap()
  email: string;
  @AutoMap(() => RoleVm)
  role: RoleVm;
}
