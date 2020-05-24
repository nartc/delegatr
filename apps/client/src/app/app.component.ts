import { Component, OnInit } from '@angular/core';
import { AuthService } from '@delegatr/client/core';
import { ApiException } from '@delegatr/client/nswag';

@Component({
  selector: 'delegatr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}

  ngOnInit() {
    this.authService.retrieveTokenOnPageLoad().subscribe({
      error: (err: ApiException) => {
        if (err.statusCode === 401) {
          console.log('Unauthorized');
        }
      },
    });
  }

  onResendClick() {
    this.authService.openResend();
  }
}
