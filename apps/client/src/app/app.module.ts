import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientCoreModule } from '@delegatr/client/core';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NzLayoutModule,
    NzNotificationModule,
    ClientCoreModule,
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class AppModule {}
