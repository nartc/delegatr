import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchPasswordValidator } from '@delegatr/client/common';
import { ApiException } from '@delegatr/client/nswag';
import { RxState } from '@rx-angular/state';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'delegatr-register',
  templateUrl: './register.component.html',
  styles: [
    `
      .register-form-margin {
        margin-bottom: 1.5rem;
      }

      .register-form-button {
        width: 100%;
      }

      nz-card {
        max-width: 50rem;
        margin: auto;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent
  extends RxState<{ loading: boolean; formState: 'ready' | 'submitted' }>
  implements OnInit {
  readonly isLoading$ = this.select('loading');
  readonly formState$ = this.select('formState');

  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly nzNotificationService: NzNotificationService
  ) {
    super();
    this.set({ formState: 'ready' });
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.maxLength(100)]],
        lastName: ['', [Validators.required, Validators.maxLength(100)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, matchPasswordValidator()]],
      },
      { updateOn: 'blur' }
    );
  }

  submitForm() {
    this.set('loading', () => false);
    this.authService
      .register(this.form.value)
      .pipe(
        finalize(() => {
          this.set('loading', () => false);
        })
      )
      .subscribe({
        next: () => {
          this.set('formState', () => 'submitted');
          this.form.reset();
          this.form.markAsUntouched();
        },
        error: (err: ApiException) => {
          this.nzNotificationService.error('Registration Error', err.error);
        },
      });
  }

  hideResult() {
    this.set('formState', () => 'ready');
  }
}
