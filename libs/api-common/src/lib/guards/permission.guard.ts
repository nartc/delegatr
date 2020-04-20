import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PermissionPrivilege } from '../api-permissions';
import { PERMISSIONS_DECORATOR } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const routePermissions = this.reflector.get<{
      [key: string]: PermissionPrivilege;
    }>(PERMISSIONS_DECORATOR, context.getHandler());

    if (!routePermissions || !Object.keys(routePermissions).length) {
      return true;
    }

    const currentUser = context.switchToHttp().getRequest().user as any;
    const hasPermission = () =>
      Object.entries(currentUser.role.permissions).every(
        ([key, score]) =>
          !routePermissions[key] || score >= routePermissions[key]
      );

    return (
      currentUser &&
      (currentUser.isSuper || currentUser.role.isGlobal || hasPermission())
    );
  }
}
