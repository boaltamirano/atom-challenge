import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/_reducers';
import { UserActionTypes, UserLoaded } from '../_actions/user.actions';
import { UsersService } from '../../_services/users.services';
import { currentUser } from '../_selectors/user.selector';
import { UserModel } from '../../_models/user.model';

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
