import { Injectable } from '@angular/core';
import {
  LoginParamsVm,
  RegisterParamsVm,
  SecurityClient,
  TokenResultVm,
} from '@delegatr/client/nswag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly securityClient: SecurityClient) {}

  login(email: string, password: string): Observable<TokenResultVm> {
    const params = LoginParamsVm.fromJS({ email, password });
    return this.securityClient.login(params);
  }

  register(formValue: unknown) {
    const params = RegisterParamsVm.fromJS(formValue);
    return this.securityClient.register(params);
  }
}
