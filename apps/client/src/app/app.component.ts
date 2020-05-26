import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getDeepestChildSnapshot } from '@delegatr/client/common';
import { AuthService } from '@delegatr/client/core';
import { ApiException } from '@delegatr/client/nswag';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'delegatr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly nzNotificationService: NzNotificationService
  ) {}

  ngOnInit() {
    this.authService.retrieveTokenOnPageLoad().subscribe({
      error: (err: ApiException) => {
        if (err.statusCode === 401) {
          this.nzNotificationService.error(
            'Authentication Error',
            'Something went wrong. Please re-login'
          );
          this.redirectToLogin();
        }
      },
    });
  }

  onResendClick() {
    this.authService.openResend();
  }

  private redirectToLogin() {
    const deepestChild = getDeepestChildSnapshot(this.route.snapshot);

    if (deepestChild.url.some((seg) => seg.path.includes('login'))) {
      return;
    }

    this.router.navigate(['/login']);
  }
}
