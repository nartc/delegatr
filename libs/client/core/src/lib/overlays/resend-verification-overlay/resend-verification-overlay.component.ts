import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiException } from '@delegatr/client/nswag';
import { RxState } from '@rx-angular/state';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize, startWith } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'delegatr-resend-verification-overlay',
  template: `
    <nz-modal
      [nzVisible]="visible$ | async"
      nzTitle="Resend Verification Email"
      (nzOnCancel)="onCancel()"
      (nzOnOk)="onOk()"
      [nzOkLoading]="(formStatus$ | async) === 'loading'"
      [nzOkDisabled]="emailControl.invalid"
    >
      <nz-form-item>
        <nz-form-label [nzSpan]="6" nzFor="email">E-mail</nz-form-label>
        <nz-form-control [nzSpan]="14" [nzErrorTip]="emailError">
          <input nz-input [formControl]="emailControl" id="email" />
          <ng-template #emailError let-control>
            <ng-container *ngIf="control.hasError('required')">
              Please enter your email
            </ng-container>
            <ng-container *ngIf="control.hasError('email')">
              Please enter a valid email
            </ng-container>
          </ng-template>
        </nz-form-control>
      </nz-form-item>
    </nz-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResendVerificationOverlayComponent extends RxState<{
  status: 'idle' | 'loading';
}> {
  visible$ = this.authService.isResendActivate$.pipe(startWith(false));
  formStatus$ = this.select('status');

  emailControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private readonly authService: AuthService,
    private readonly nzNotificationService: NzNotificationService
  ) {
    super();
    this.set({ status: 'idle' });
  }

  onCancel() {
    this.authService.closeResend();
  }

  onOk() {
    this.set({ status: 'loading' });
    this.authService
      .resendVerification(this.emailControl.value)
      .pipe(
        finalize(() => {
          this.set({ status: 'idle' });
        })
      )
      .subscribe({
        next: () => {
          this.emailControl.reset();
          this.nzNotificationService.success(
            'Resend Verification Successfully',
            'Please check your email'
          );
          this.authService.closeResend();
        },
        error: (err: ApiException) => {
          this.nzNotificationService.error(
            'Resend Verification Failed',
            err.error
          );
        },
      });
  }
}
