import { CacheService } from '@delegatr/api/caching';
import { BaseService } from '@delegatr/api/common';
import { UserInformationVm, UserVm } from '@delegatr/api/view-models';
import { Injectable } from '@nestjs/common';
import parse from 'date-fns/parse';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { v4 as uuid } from 'uuid';
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

  async getUserById(id: string): Promise<User> {
    return await this.cacheService.get(`user_${id}`, () =>
      this.userRepository.findById(id).exec()
    );
  }

  async getUserInformation(id: string): Promise<UserInformationVm> {
    const user = await this.getUserById(id);
    return this.mapper.map(user, UserInformationVm, User);
  }

  async verify(id: string): Promise<UserVm> {
    const now = parse(
      new Date().toLocaleString(),
      'M/d/yyyy, h:mm:ss aaa',
      Date.now()
    );
    const result = await this.userRepository
      .updateBy(id, {
        $set: { verify: now },
      })
      .exec();

    return this.mapper.map(result, UserVm, User);
  }

  async updateRefreshTokenId(id: string) {
    await this.userRepository
      .updateBy(
        id,
        { $set: { refreshTokenId: uuid() } },
        { lean: false, autopopulate: false }
      )
      .exec();
  }
}
