import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzCheckboxModule,
    NzButtonModule,
    NzCardModule,
    RouterModule,
    NzSpinModule,
    NzResultModule
  ],
  declarations: [LoginComponent, LayoutComponent, RegisterComponent],
  exports: [LoginComponent, LayoutComponent, RegisterComponent],
})
export class ClientCoreModule {}
