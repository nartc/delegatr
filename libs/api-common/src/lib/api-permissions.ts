export enum PermissionPrivilege {
  Read = 1,
  Create = 2,
  Update = 4,
  Delete = 8,
}

export enum PermissionScore {
  None = 0,
  CanRead = PermissionPrivilege.Read,
  CanCreate = PermissionScore.CanRead + PermissionPrivilege.Create,
  CanUpdate = PermissionScore.CanCreate + PermissionPrivilege.Update,
  CanDelete = PermissionScore.CanUpdate + PermissionPrivilege.Delete,
}

export interface Permission {
  [key: string]: PermissionScore;
}
