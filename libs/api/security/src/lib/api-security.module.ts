import { ApiAuthModule } from '@delegatr/api/auth';
import { ApiUserModule } from '@delegatr/api/user';
import { Module } from '@nestjs/common';
import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';

@Module({
  imports: [ApiAuthModule, ApiUserModule],
  controllers: [SecurityController],
  providers: [SecurityService],
  exports: [],
})
export class ApiSecurityModule {}
