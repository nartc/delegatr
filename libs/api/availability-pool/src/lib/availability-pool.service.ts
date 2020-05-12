import { Injectable } from '@nestjs/common';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { BaseService } from '../../../common/src/lib/base.service';
import { AvailabilityPool } from './availability-pool.model';
import { AvailabilityPoolRepository } from './availability-pool.repository';

@Injectable()
export class AvailabilityPoolService extends BaseService<AvailabilityPool> {
  constructor(
    private readonly availabilityPoolRepository: AvailabilityPoolRepository,
    @InjectMapper() private readonly mapper: AutoMapper
  ) {
    super(availabilityPoolRepository);
  }

  async findAvailabilityPool(availabilityPoolId): Promise<AvailabilityPool> {
    return await this.availabilityPoolRepository.findAvailabilityPool(availabilityPoolId);
  }
}
