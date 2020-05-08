import { ApiErrors } from '@delegatr/api/common';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('users')
@ApiTags(User.modelName)
@ApiErrors()
export class UserController {
  constructor(private readonly userService: UserService) {}
}
