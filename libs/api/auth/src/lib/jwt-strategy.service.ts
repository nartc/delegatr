import { InjectAuthConfig } from '@delegatr/api/config';
import { AuthConfig } from '@delegatr/api/types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
    @InjectAuthConfig() private readonly authConfig: AuthConfig
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConfig.jwtSecret,
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback): Promise<void> {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      return done(new UnauthorizedException(), null);
    }

    return done(null, user);
  }
}
