import { Role } from '@delegatr/api/role';
import { RoleVm } from '@delegatr/api/view-models';
import { AutoMapper, Profile, ProfileBase } from 'nestjsx-automapper';

@Profile()
export class RoleProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Role, RoleVm);
  }
}
