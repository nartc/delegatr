import { ApiErrors } from '@delegatr/api/common';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AvailabilityPool } from './availability-pool.model';
import { AvailabilityPoolService } from './availability-pool.service';

@Controller('availabilityPools')
@ApiTags(AvailabilityPool.modelName)
@ApiErrors()
export class AvailabilityPoolController {
  constructor(private readonly availabilityPoolService: AvailabilityPoolService) {}
}
