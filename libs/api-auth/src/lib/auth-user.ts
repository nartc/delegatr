import { BaseVm } from '@delegatr/api-common';
import { RoleVm } from '@delegatr/api-view-model';
import { AutoMap } from '@nartc/automapper';

export class AuthUser extends BaseVm {
  @AutoMap()
  email: string;
  @AutoMap(() => RoleVm)
  role: RoleVm;
  @AutoMap()
  isSuper: boolean;
}
