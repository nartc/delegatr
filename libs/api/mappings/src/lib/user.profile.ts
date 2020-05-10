import { AuthUser } from '@delegatr/api/auth';
import { Permission } from '@delegatr/api/permission';
import { Role } from '@delegatr/api/role';
import { User } from '@delegatr/api/user';
import { RoleVm, UserVm } from '@delegatr/api/view-models';
import {
  AutoMapper,
  mapFrom,
  mapWith,
  Profile,
  ProfileBase,
} from 'nestjsx-automapper';
import { UserInformationVm } from '../../../view-models/src/lib/user-information.vm';

@Profile()
export class UserProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(User, UserVm).reverseMap();
    mapper.createMap(User, AuthUser).forMember(
      (d) => d.role,
      mapWith(RoleVm, (s) => s.role)
    );
    mapper
      .createMap(User, UserInformationVm)
      .forMember(
        (d) => d.fullName,
        mapFrom((s) => s.firstName + ' ' + s.lastName)
      )
      .forMember((d) => d.permissions, mapFrom(this.permissionsMap.bind(this)));
  }

  private permissionsMap(source: User): { [key: string]: number } {
    return (source.role as Role).permissions.reduce(this.permissionReducer, {});
  }

  private permissionReducer(
    entity: { [key: string]: number },
    permission: Permission
  ): typeof entity {
    entity[permission.group] = permission.score;
    return entity;
  }
}
