import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mapTo, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.token$.pipe(
      switchMap((token) => {
        if (token == null) {
          return this.authService.forceLogOut().pipe(
            mapTo(false),
            tap(() => {
              this.router.navigate(['/login']);
            })
          );
        }
        return of(true);
      })
    );
  }
}
