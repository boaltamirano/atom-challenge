import { Action } from '@ngrx/store';
import { UserModel } from 'src/app/core/_models/user.model';

export enum UserActionTypes {
    UserLoaded = '[Load User] Action'
}

export class UserLoaded implements Action {
    readonly type = UserActionTypes.UserLoaded;
    constructor(public payload: { user: UserModel }) { }
}

export type UserActions = UserLoaded;
