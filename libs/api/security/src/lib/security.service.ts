import { AuthService } from '@delegatr/api/auth';
import { UserService } from '@delegatr/api/user';
import { LoginParamsVm, RegisterParamsVm } from '@delegatr/api/view-models';
import {
  EmailJob,
  emailQueueName,
  UserJob,
  userQueueName,
  VerifyRegistrationEmailData
} from '@delegatr/background/common';
import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { Queue } from 'bull';
import { TokenResultVm } from '../../../view-models/src/lib/token-result.vm';

@Injectable()
export class SecurityService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    @InjectQueue(emailQueueName) private readonly emailQueue: Queue,
    @InjectQueue(userQueueName) private readonly userQueue: Queue
  ) {
  }

  async register(params: RegisterParamsVm): Promise<void> {
    const { email, password, firstName, lastName } = params;
    const user = await this.userService.findByEmail(email);
    if (user != null) {
      throw new BadRequestException(email, 'Email already exists');
    }

    const newUser = this.userService.createModel({
      email,
      firstName,
      lastName
    });
    newUser.password = await this.authService.hashPassword(password);
    await this.userQueue.add(UserJob.AddUser, newUser);
    const emailData: VerifyRegistrationEmailData = {
      email: newUser.email,
      firstName: newUser.firstName,
      verifyUrl: ''
    };
    await this.emailQueue.add(EmailJob.VerifyRegistration, emailData);
  }

  async login(params: LoginParamsVm): Promise<[TokenResultVm, string]> {
    const { email, password } = params;
    const user = await this.userService.findByEmail(email);
    if (user == null) {
      throw new BadRequestException(email, 'Wrong credentials');
    }

    const isMatched = await compare(password, user.password);
    if (!isMatched) {
      throw new BadRequestException(password, 'Wrong credentials');
    }

    const [accessTokenResult, refreshToken] = await Promise.all([
      this.authService.createAccessToken(user.email),
      this.authService.createRefreshToken(user.id)
    ]);

    return [accessTokenResult, refreshToken];
  }
}
