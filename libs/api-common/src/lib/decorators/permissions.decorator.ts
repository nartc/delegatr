import { SetMetadata } from '@nestjs/common';
import { PermissionPrivilege } from '../api-permissions';

export const PERMISSIONS_DECORATOR = 'allowed:permissions';
export const Permissions = (permissions: {
  [key: string]: PermissionPrivilege;
}) => SetMetadata(PERMISSIONS_DECORATOR, permissions);
