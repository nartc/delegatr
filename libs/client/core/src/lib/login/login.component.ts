import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiException } from '@delegatr/client/nswag';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'delegatr-login',
  templateUrl: './login.component.html',
  styles: [
    `
      nz-card {
        max-width: 30rem;
        margin: auto;
      }

      .login-form-margin {
        margin-bottom: 1.5rem;
      }

      .login-form-forgot {
        text-align: end;
      }

      .login-form-button {
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly nzNotificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  submitForm() {
    const { email, password } = this.validateForm.value;

    if (!email || !password) {
      for (const control of Object.values(this.validateForm.controls)) {
        control.markAsDirty();
        control.updateValueAndValidity();
      }
      return;
    }

    this.authService.login(email, password).subscribe({
      error: (err: ApiException) => {
        this.nzNotificationService.error('Login Failed', err.error);
      },
    });
  }
}
