import { Injectable } from '@nestjs/common';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { BaseService } from '../../../common/src/lib/base.service';
import { TimeFrame } from './time-frame.model';
import { TimeFrameRepository } from './time-frame.repository';

@Injectable()
export class TimeFrameService extends BaseService<TimeFrame> {
  constructor(
    private readonly timeFrameRepository: TimeFrameRepository,
    @InjectMapper() private readonly mapper: AutoMapper
  ) {
    super(timeFrameRepository);
  }

  async findTimeFrame(timeFrameId): Promise<TimeFrame> {
    return await this.timeFrameRepository.findTimeFrame(timeFrameId);
  }
}
