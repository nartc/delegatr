import { BaseVm } from '@delegatr/api/common';
import { AutoMap } from 'nestjsx-automapper';
import { RoleVm } from '../../../view-models/src/lib/role.vm';

export class AuthUser extends BaseVm {
  @AutoMap()
  email: string;
  @AutoMap(() => RoleVm)
  role: RoleVm;
}
