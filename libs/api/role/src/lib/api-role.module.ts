import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleController } from './role.controller';
import { Role } from './role.model';
import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';

@Module({
  imports: [MongooseModule.forFeature([Role.featureConfig])],
  controllers: [RoleController],
  providers: [RoleRepository, RoleService],
  exports: [RoleService],
})
export class ApiRoleModule {}
