import { AuthUser } from '@delegatr/api/auth';
import { User } from '@delegatr/api/user';
import { RoleVm, UserVm } from '@delegatr/api/view-models';
import { AutoMapper, mapWith, Profile, ProfileBase } from 'nestjsx-automapper';

@Profile()
export class UserProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(User, UserVm).reverseMap();
    mapper.createMap(User, AuthUser).forMember(
      (d) => d.role,
      mapWith(RoleVm, (s) => s.role)
    );
  }
}
