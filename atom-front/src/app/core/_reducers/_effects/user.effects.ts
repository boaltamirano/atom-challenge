// Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// RxJS
import { switchMap, tap } from 'rxjs/operators';
import { of, map, Subscription } from 'rxjs';
// NGRX
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/_reducers';
// Auth actions
// import { UserActionTypes, UserLoaded, UserRequested } from '../_actions/user.actions';
import { UserActionTypes, UserLoaded } from '../_actions/user.actions';
import { UsersService } from '../../_services/users.services';
import { environment } from 'src/environments/environment';
import { Logout } from 'src/app/modules/auth/_reducers/_actions/auth.actions';
import { currentUser } from '../_selectors/user.selector';
import { UserModel } from '../../_models/user.model';
import { TaskModel } from '../../_models/task.model';
import { TaskLoaded } from '../_actions/task.actions';
import { TaskService } from '../../_services/task.services';

@Injectable()
export class UserEffects {

    loadedUser$ = createEffect(() => this.actions$
        .pipe(
            ofType<UserLoaded>(UserActionTypes.UserLoaded),
            tap(action => {
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            })
        ), {
        dispatch: false,
    });

    user: UserModel = new UserModel()

    private subscriptions: Subscription[] = [];

    constructor(
        private actions$: Actions,
        private router: Router,
        private _usersService: UsersService,
        private store: Store<AppState>,
    ) { }

    ngOnDestroy() {
        this.subscriptions.forEach(sb => sb.unsubscribe());
    }

    setPermissions() {
        this.store.pipe(select(currentUser))
            .subscribe((res) => {

            })

    }
}
