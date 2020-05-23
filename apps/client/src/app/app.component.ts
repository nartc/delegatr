import { Component } from '@angular/core';
import { AuthService } from '@delegatr/client/core';

@Component({
  selector: 'delegatr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly authService: AuthService) {}

  onResendClick() {
    this.authService.openResend();
  }
}
