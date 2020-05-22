import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  LayoutComponent,
  LoginComponent,
  RegisterComponent,
} from '@delegatr/client/core';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
