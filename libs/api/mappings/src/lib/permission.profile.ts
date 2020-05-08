import { Permission } from '@delegatr/api/permission';
import { PermissionVm } from '@delegatr/api/view-models';
import { AutoMapper, Profile, ProfileBase } from 'nestjsx-automapper';

@Profile()
export class PermissionProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Permission, PermissionVm).reverseMap();
  }
}
