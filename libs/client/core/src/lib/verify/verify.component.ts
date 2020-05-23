import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Destroyable } from '@delegatr/client/common';
import { ApiException } from '@delegatr/client/nswag';
import { RxState } from '@rx-angular/state';
import { NzResultStatusType } from 'ng-zorro-antd/result';
import { EMPTY } from 'rxjs';
import { pluck, switchMap, takeUntil } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'delegatr-verify',
  templateUrl: './verify.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class VerifyComponent extends Destroyable implements OnInit {
  readonly vm$ = this.rxState.select();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly rxState: RxState<{
      status: NzResultStatusType;
      title: string;
      isLoading: boolean;
      subtitle?: string;
    }>,
    private readonly authService: AuthService
  ) {
    super();
    rxState.set({ status: 'info', title: 'Verifying', isLoading: true });
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        pluck('token'),
        switchMap((token: string) => {
          if (token == null) {
            this.rxState.set({
              title: 'Missing Information',
              subtitle: 'Token not found',
              status: 'warning',
              isLoading: false,
            });
            return EMPTY;
          }

          return this.authService.verify(token);
        }),
        takeUntil(this.$destroyed)
      )
      .subscribe({
        next: (user) => {
          this.rxState.set({
            isLoading: false,
            status: 'success',
            title: 'Verification Successfully',
            subtitle: `${user.email} has been verified`,
          });
        },
        error: (err: ApiException) => {
          this.rxState.set({
            isLoading: false,
            status: 'error',
            title: 'Verification Error',
            subtitle: err.error,
          });
        },
      });
  }

  onResendVerificationClick() {
    this.authService.openResend();
  }
}
