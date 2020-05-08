import { InjectAuthConfig } from '@delegatr/api/config';
import { AuthConfig } from '@delegatr/api/types';
import { User, UserService } from '@delegatr/api/user';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { genSalt, hash } from 'bcrypt';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { AuthUser } from './auth-user';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectMapper() private readonly mapper: AutoMapper,
    @InjectAuthConfig() private readonly authConfig: AuthConfig,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async hashPassword(data: string): Promise<string> {
    try {
      const salt = await genSalt(this.authConfig.salt);
      return await hash(data, salt);
    } catch (e) {
      throw new InternalServerErrorException(`Error: ${e}`);
    }
  }

  authenticate(email: string, roleId: string): Promise<string> {
    return this.jwtService.signAsync({ email, roleId });
  }

  async validateUser(payload: JwtPayload): Promise<AuthUser> {
    const user = await this.userService.findByEmail(payload.email);
    return this.mapper.map(user, AuthUser, User);
  }
}
