import { AuthService } from '@delegatr/api/auth';
import { UserService } from '@delegatr/api/user';
import {
  LoginParamsVm,
  RegisterParamsVm,
  TokenResultVm,
  UserVm,
} from '@delegatr/api/view-models';
import {
  EmailJob,
  emailQueueName,
  UserJob,
  userQueueName,
  VerifyRegistrationEmailData,
} from '@delegatr/background/common';
import { InjectQueue } from '@nestjs/bull';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { Queue } from 'bull';

@Injectable()
export class SecurityService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    @InjectQueue(emailQueueName) private readonly emailQueue: Queue,
    @InjectQueue(userQueueName) private readonly userQueue: Queue
  ) {}

  async register(params: RegisterParamsVm): Promise<void> {
    const { email, password, firstName, lastName } = params;
    const user = await this.userService.findByEmail(email);
    if (user != null) {
      throw new BadRequestException(email, 'Email already exists');
    }

    const newUser = this.userService.createModel({
      email,
      firstName,
      lastName,
    });
    newUser.password = await this.authService.hashPassword(password);
    await this.userQueue.add(UserJob.AddUser, newUser);
    const verifyToken = await this.authService.createVerifyToken(newUser.email);
    const emailData: VerifyRegistrationEmailData = {
      email: newUser.email,
      firstName: newUser.firstName,
      verifyUrl: 'url' + verifyToken,
    };
    await this.emailQueue.add(EmailJob.VerifyRegistration, emailData);
  }

  async login(params: LoginParamsVm): Promise<[TokenResultVm, string]> {
    const { email, password } = params;
    const user = await this.userService.findByEmail(email);
    if (user == null) {
      throw new NotFoundException(email, 'Wrong credentials');
    }

    if (user.verify == null) {
      throw new BadRequestException(email, 'User not verified');
    }

    const isMatched = await compare(password, user.password);
    if (!isMatched) {
      throw new NotFoundException(password, 'Wrong credentials');
    }

    const [accessTokenResult, refreshToken]: [
      TokenResultVm,
      string
    ] = await Promise.all([
      this.authService.createAccessToken(user.email),
      this.authService.createRefreshToken(user.id),
    ]);
    await this.userService.saveRefreshToken(user.id, refreshToken);
    return [accessTokenResult, refreshToken];
  }

  async verify(token: string): Promise<UserVm> {
    const { email } = await this.authService.verify<{ email: string }>(token);
    const user = await this.userService.findByEmail(email);
    if (user == null) {
      throw new NotFoundException(email, 'User not found');
    }

    if (user.verify != null) {
      throw new BadRequestException(email, 'User has been verified');
    }

    return await this.userService.verify(user.id);
  }

  async resendVerificationEmail(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);
    if (user == null) {
      throw new NotFoundException(email, 'User not found');
    }

    if (user.verify != null) {
      throw new BadRequestException(email, 'User has been verified');
    }

    const token = await this.authService.createVerifyToken(user.email);
    const emailData: VerifyRegistrationEmailData = {
      email: user.email,
      firstName: user.firstName,
      verifyUrl: 'url' + token,
    };
    await this.emailQueue.add(EmailJob.VerifyRegistration, emailData);
  }
}
