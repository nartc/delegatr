import { Injectable } from '@angular/core';
import {
  ApiException,
  LoginParamsVm,
  RegisterParamsVm,
  SecurityClient,
  TokenResultVm,
  UserClient,
  UserInformationVm,
  UserVm,
  VerifyRegistrationParamsVm,
} from '@delegatr/client/nswag';
import { RxState } from '@rx-angular/state';
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';
import subMinutes from 'date-fns/subMinutes';
import { EMPTY, Observable, pipe, Subscription, throwError, timer } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

interface AuthState {
  isResendActivate: boolean;
  token: string;
  tokenExpiry: Date;
  currentUser: UserInformationVm;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService extends RxState<AuthState> {
  readonly isResendActivate$ = this.select('isResendActivate');
  readonly token$ = this.select('token');
  readonly tokenExpiry$ = this.select('tokenExpiry');
  readonly currentUser$ = this.select('currentUser');

  private jwtTimerSubscription: Subscription;
  private readonly handleTokenMe = () => {
    return pipe<Observable<TokenResultVm>, Observable<UserInformationVm>>(
      switchMap((result) => {
        this._setupRefreshTimer(result);
        return this.userClient.me().pipe(
          tap((user) => {
            this.set((prev) => ({ ...prev, currentUser: user }));
          }),
          catchError((err: ApiException) => {
            this.set((prev) => ({ ...prev, currentUser: null }));
            return EMPTY;
          })
        );
      })
    );
  };

  constructor(
    private readonly securityClient: SecurityClient,
    private readonly userClient: UserClient
  ) {
    super();
  }

  login(email: string, password: string): Observable<UserInformationVm> {
    const params = LoginParamsVm.fromJS({ email, password });
    return this.securityClient.login(params).pipe(this.handleTokenMe());
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
    this.set((prev) => ({ ...prev, isResendActivate: true }));
  }

  closeResend() {
    this.set((prev) => ({ ...prev, isResendActivate: false }));
  }

  resendVerification(email: string): Observable<void> {
    return this.securityClient.resendVerificationEmail(email);
  }

  retrieveTokenOnPageLoad() {
    return this.securityClient.refreshToken().pipe(
      catchError((err: ApiException) => {
        if (err.statusCode === 401) {
          // do something with 401
        }
        this.set({ token: '', tokenExpiry: null });
        return throwError(err);
      }),
      this.handleTokenMe()
    );
  }

  forceLogOut() {
    return this.securityClient.logout();
  }

  private _setupRefreshTimer(tokenResult: TokenResultVm) {
    const { token, expiry } = tokenResult;
    this.set({ token, tokenExpiry: expiry });
    const delayInMilli = differenceInMilliseconds(
      subMinutes(expiry, 1),
      new Date()
    );

    if (this.jwtTimerSubscription) {
      this.jwtTimerSubscription.unsubscribe();
    }

    this.jwtTimerSubscription = timer(delayInMilli)
      .pipe(switchMap(() => this.retrieveTokenOnPageLoad()))
      .subscribe();
  }
}
