import { BaseRepository, ModelType } from '@delegatr/api/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './role.model';

@Injectable()
export class RoleRepository extends BaseRepository<Role> {
  constructor(
    @InjectModel(Role.modelName) private readonly roleModel: ModelType<Role>
  ) {
    super(roleModel);
  }
}
