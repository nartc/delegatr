import { CacheService } from '@delegatr/api/caching';
import { BaseService } from '@delegatr/api/common';
import { UserVm } from '@delegatr/api/view-models';
import { Injectable } from '@nestjs/common';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { User } from './user.model';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cacheService: CacheService,
    @InjectMapper() private readonly mapper: AutoMapper
  ) {
    super(userRepository);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }

  async getUsers(): Promise<UserVm[]> {
    const users = await this.cacheService.get('users', () =>
      this.userRepository.findAll().exec()
    );

    return this.mapper.mapArray(users, UserVm, User);
  }
}
