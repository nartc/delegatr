import { BaseRepository } from '@delegatr/api/common';
import { ModelType } from '@delegatr/api/types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TimeFrame } from './time-frame.model';

@Injectable()
export class TimeFrameRepository extends BaseRepository<TimeFrame> {
  constructor(
    @InjectModel(TimeFrame.modelName) private readonly timeFrameModel: ModelType<TimeFrame>
  ) {
    super(timeFrameModel);
  }

  async findTimeFrame(timeFrameId: string) {
    try {
      return await this.findOne().where('id').equals(timeFrameId).exec();
    } catch (e) {
      TimeFrameRepository.throwMongoError(e);
    }
  }

}
