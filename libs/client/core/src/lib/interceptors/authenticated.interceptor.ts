import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import isAfter from 'date-fns/isAfter';
import { combineLatest, defer, Observable } from 'rxjs';
import { mergeMap, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthenticatedInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      req.url.includes('/security/login') ||
      req.url.includes('/security/refresh-token')
    ) {
      return next.handle(req);
    }

    return combineLatest([
      this.authService.token$,
      this.authService.tokenExpiry$,
    ]).pipe(
      take(1),
      mergeMap(([token, expired]) => {
        if (!token) {
          return next.handle(req);
        }

        const cloned = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        });

        return defer(() =>
          isAfter(new Date(), expired)
            ? this.authService
                .retrieveTokenOnPageLoad()
                .pipe(switchMap(() => next.handle(cloned)))
            : next.handle(cloned)
        );
      })
    );
  }
}

export const AuthenticatedInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticatedInterceptor,
    multi: true,
  },
];
