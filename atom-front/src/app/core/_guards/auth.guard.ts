import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AppState } from '../_reducers';
import { currentUser } from '../_reducers/_selectors/user.selector';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store<AppState>,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.store
      .pipe(
        select(currentUser),
        tap((user: any) => {
          let token = localStorage.getItem(environment.auth_token_key)
          if (!token) {
            this.router.navigate(['/auth/login']);
          }
        })
      );
  }

}
