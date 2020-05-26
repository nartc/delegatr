import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AuthenticatedGuard,
  LayoutComponent,
  LoginComponent,
  RegisterComponent,
  UnauthenticatedGuard,
} from '@delegatr/client/core';
import { VerifyComponent } from '../../../../libs/client/core/src/lib/verify/verify.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthenticatedGuard],
    component: LayoutComponent,
  },
  {
    path: 'login',
    canActivate: [UnauthenticatedGuard],
    component: LoginComponent,
  },
  {
    path: 'register',
    canActivate: [UnauthenticatedGuard],
    component: RegisterComponent,
  },
  {
    path: 'verify',
    canActivate: [UnauthenticatedGuard],
    component: VerifyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
