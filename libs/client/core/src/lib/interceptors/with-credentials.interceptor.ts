import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class WithCredentialsInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      req.url.includes('/security/login') ||
      req.url.includes('/security/refresh-token')
    ) {
      const cloned = req.clone({
        withCredentials: true
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}

export const WithCredentialsInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: WithCredentialsInterceptor,
    multi: true
  }
];
