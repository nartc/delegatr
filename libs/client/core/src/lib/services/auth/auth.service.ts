import { Injectable } from '@angular/core';
import {
  LoginParamsVm,
  RegisterParamsVm,
  SecurityClient,
  TokenResultVm,
  UserVm,
  VerifyRegistrationParamsVm,
} from '@delegatr/client/nswag';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly $resendOverlay = new Subject<boolean>();
  readonly resendOverlay$ = this.$resendOverlay.asObservable();

  constructor(private readonly securityClient: SecurityClient) {}

  login(email: string, password: string): Observable<TokenResultVm> {
    const params = LoginParamsVm.fromJS({ email, password });
    return this.securityClient.login(params);
  }

  register(formValue: unknown): Observable<void> {
    const params = RegisterParamsVm.fromJS(formValue);
    return this.securityClient.register(params);
  }

  verify(token: string): Observable<UserVm> {
    const params = VerifyRegistrationParamsVm.fromJS({ token });
    return this.securityClient.verify(params);
  }

  openResend() {
    this.$resendOverlay.next(true);
  }

  closeResend() {
    this.$resendOverlay.next(false);
  }

  resendVerification(email: string): Observable<void> {
    return this.securityClient.resendVerificationEmail(email);
  }
}
