import { AuthUser } from '@delegatr/api/auth';
import { memoize } from '@delegatr/api/common';
import { CanActivate, ExecutionContext, Logger, mixin } from '@nestjs/common';
import { Constructor } from '@nestjs/common/utils/merge-with-values.util';
import { PermissionGroups } from '../permission-groups';
import { Privilege } from '../privilege';

export const PermissionGuard: (
  group: PermissionGroups,
  privilege: Privilege
) => CanActivate = memoize(createPermissionGuard);

function createPermissionGuard(
  group: PermissionGroups,
  privilege: Privilege
): Constructor<CanActivate> {
  class MixinPermissionGuard implements CanActivate {
    constructor() {
      if (group == null || privilege == null) {
        const message =
          'PermissionGuard cannot be instantiated with null arguments';
        new Logger('PermissionGuard').error(message);
        throw new Error(message);
      }
    }

    canActivate(context: ExecutionContext) {
      const currentUser = context.switchToHttp().getRequest().user as AuthUser;

      const hasPermission = () => {
        return currentUser.role.permissions.some(
          (permission) =>
            permission.name === group &&
            (permission.score & privilege) === privilege
        );
      };

      return currentUser && (currentUser.role.isGlobal || hasPermission());
    }
  }

  return mixin(MixinPermissionGuard);
}
