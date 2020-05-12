import { BaseRepository } from '@delegatr/api/common';
import { ModelType } from '@delegatr/api/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AvailabilityPool } from './availability-pool.model';

@Injectable()
export class AvailabilityPoolRepository extends BaseRepository<AvailabilityPool> {
  constructor(
    @InjectModel(AvailabilityPool.modelName) private readonly availabilityPoolModel: ModelType<AvailabilityPool>
  ) {
    super(availabilityPoolModel);
  }

  async findAvailabilityPool(availabilityPoolId: string) {
    try {
      return await this.findOne().where('id').equals(availabilityPoolId).exec();
    } catch (e) {
      AvailabilityPoolRepository.throwMongoError(e);
    }
  }

}
