import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/_reducers';
import { AuthActionTypes, Login, Logout } from '../_actions/auth.actions';
import { AuthService } from '../../_services/auth.services';
import { environment } from 'src/environments/environment';
import { UserLoaded } from 'src/app/core/_reducers/_actions/user.actions';
import { UserModel } from 'src/app/core/_models/user.model';
import { LoadingTask, TaskRequested } from 'src/app/core/_reducers/_actions/task.actions';

@Injectable()
export class AuthEffects {

    login$ = createEffect(() => this.actions$.pipe(
        ofType<Login>(AuthActionTypes.Login),
        tap(action => {
            localStorage.setItem(environment.auth_token_key, action.payload.authToken);
            this.store.dispatch(new UserLoaded({ user: action.payload.user }));
            this.store.dispatch(new LoadingTask({ isLoading: true}));
            this.store.dispatch(new TaskRequested());
        }),
    ), {
        dispatch: false,
    });


    logout$ = createEffect(() => this.actions$.pipe(
        ofType<Logout>(AuthActionTypes.Logout),
        mergeMap(() => {
            this._authService.logout()
            this.store.dispatch(new UserLoaded({ user: (new UserModel) }));
            this.router.navigate(['/auth/login']);
            return of()
        }),
        tap(() => {
            this.router.navigate(['/auth/login']);
        })
    ), {
        dispatch: false,
    });

    constructor(
        private actions$: Actions,
        private router: Router,
        private _authService: AuthService,
        private store: Store<AppState>) {

    }
}
