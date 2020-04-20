import { Role } from '@delegatr/api-domain-model';

const systemAdminRole = new Role();
systemAdminRole.roleName = 'System Admin';
systemAdminRole.isGlobal = true;
systemAdminRole.note = 'Pre-built System Admin role';
systemAdminRole.isActive = true;

export { systemAdminRole };
