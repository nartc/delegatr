import { ApiErrors, ApiOperationId } from '@delegatr/api/common';
import { UserVm } from '@delegatr/api/view-models';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('users')
@ApiTags(User.modelName)
@ApiErrors()
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  @ApiOkResponse({ type: UserVm, isArray: true })
  @ApiOperationId()
  async get(): Promise<UserVm[]> {
    return await this.userService.getUsers();
  }
}
