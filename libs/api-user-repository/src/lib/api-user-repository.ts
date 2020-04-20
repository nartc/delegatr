import { BaseRepository } from '@delegatr/api-common';
import { User } from '@delegatr/api-domain-model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class ApiUserRepository extends BaseRepository<User> {
  constructor(
    @InjectModel(User.modelName)
    private readonly userModel: ReturnModelType<typeof User>
  ) {
    super(userModel);
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.findOne().where('email').equals(email).exec();
    } catch (e) {
      ApiUserRepository.throwMongoError(e);
    }
  }
}
