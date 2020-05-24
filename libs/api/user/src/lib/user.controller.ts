import { ApiErrors, ApiOperationId, CurrentUser } from '@delegatr/api/common';
import {
  PermissionGroups,
  PermissionGuard,
  Privilege,
} from '@delegatr/api/permission';
import { AuthUser, UserInformationVm, UserVm } from '@delegatr/api/view-models';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('users')
@ApiTags(User.modelName)
@ApiErrors()
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ type: UserVm, isArray: true })
  @ApiOperationId()
  async get(): Promise<UserVm[]> {
    return await this.userService.getUsers();
  }

  @Get('me')
  @UseGuards(
    AuthGuard(),
    PermissionGuard(PermissionGroups.User, Privilege.Read)
  )
  @ApiOkResponse({ type: UserInformationVm })
  @ApiOperationId()
  async me(@CurrentUser() currentUser: AuthUser): Promise<UserInformationVm> {
    return await this.userService.getUserById(currentUser.id);
  }
}
