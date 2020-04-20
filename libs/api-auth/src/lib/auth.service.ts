import { authConfiguration } from '@delegatr/api-config';
import { User } from '@delegatr/api-domain-model';
import { ApiUserRepository } from '@delegatr/api-user-repository';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { AuthUser } from './auth-user';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectMapper() private readonly mapper: AutoMapper,
    @Inject(authConfiguration.KEY)
    private readonly authConfig: ConfigType<typeof authConfiguration>,
    private readonly jwtService: JwtService,
    private readonly apiUserRepository: ApiUserRepository
  ) {}

  async comparePassword(password: string, encrypt: string): Promise<boolean> {
    try {
      return await compare(password, encrypt);
    } catch (e) {
      throw new InternalServerErrorException(`Error: ${e}`);
    }
  }

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
    const user = await this.apiUserRepository.findByEmail(payload.email);
    return this.mapper.map(user, AuthUser, User);
  }
}
