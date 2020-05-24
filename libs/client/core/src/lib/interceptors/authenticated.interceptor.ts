import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthenticatedInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authService.token$.pipe(
      take(1),
      mergeMap((token) => {
        if (!token) {
          return next.handle(req);
        }

        const cloned = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
        return next.handle(cloned);
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
