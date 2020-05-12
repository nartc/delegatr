import { ApiErrors } from '@delegatr/api/common';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TimeFrame } from './time-frame.model';
import { TimeFrameService } from './time-frame.service';

@Controller('timeFrames')
@ApiTags(TimeFrame.modelName)
@ApiErrors()
export class TimeFrameController {
  constructor(private readonly timeFrameService: TimeFrameService) {}
}
