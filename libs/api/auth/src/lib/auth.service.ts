import { InjectAuthConfig } from '@delegatr/api/config';
import { AuthConfig } from '@delegatr/api/types';
import { User, UserService } from '@delegatr/api/user';
import { AuthUser, TokenResultVm } from '@delegatr/api/view-models';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { genSalt, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
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

  async createAccessToken(email: string): Promise<TokenResultVm> {
    const token = await this.jwtService.signAsync({ email });
    const tokenResult = new TokenResultVm();
    tokenResult.token = token;
    tokenResult.computeExpiry(this.authConfig.jwtExpired);
    return tokenResult;
  }

  async createRefreshToken(id: string, tokenId: string): Promise<string> {
    return sign(
      { id, tokenId },
      this.authConfig.refreshJwtSecret,
      { expiresIn: this.authConfig.refreshJwtExpired }
    );
  }

  async createVerifyToken(email: string): Promise<string> {
    return await this.jwtService.signAsync({ email }, { expiresIn: '1h' });
  }

  async verify<TPayload extends object = {}>(token: string): Promise<TPayload> {
    try {
      return await this.jwtService.verifyAsync<TPayload>(token);
    } catch (e) {
      throw new InternalServerErrorException(token, 'Error verifying token');
    }
  }

  async verifyRefreshToken(
    token: string
  ): Promise<{ id: string; tokenId: string }> {
    try {
      return (await verify(token, this.authConfig.refreshJwtSecret)) as {
        id: string;
        tokenId: string;
      };
    } catch (e) {
      throw new InternalServerErrorException(token, 'Error verifying token');
    }
  }

  async validateUser(payload: JwtPayload): Promise<AuthUser> {
    const user = await this.userService.findByEmail(payload.email);
    return this.mapper.map(user, AuthUser, User);
  }
}
