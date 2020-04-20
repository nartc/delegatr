import { BaseRepository } from '@delegatr/api-common';
import { Role } from '@delegatr/api-domain-model';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { systemAdminRole } from './api-role-repository.constant';

@Injectable()
export class ApiRoleRepository extends BaseRepository<Role> {
  constructor(
    @InjectModel(Role.modelName)
    private readonly roleModel: ReturnModelType<typeof Role>
  ) {
    super(roleModel);
  }

  async createSystemRoles(): Promise<void> {
    if (await this.findSystemRoles()) {
      throw new BadRequestException();
    }

    const role = this.createModel(systemAdminRole);
    await this.create(role);
  }

  private findSystemRoles(): Promise<boolean> {
    return this.exists({ roleName: { $in: ['System Admin'] } });
  }
}
