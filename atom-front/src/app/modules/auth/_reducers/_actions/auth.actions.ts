import { Action } from '@ngrx/store';;
import { UserRegisterModel } from '../../_models/user-register.model';
import { UserModel } from 'src/app/core/_models/user.model';

export enum AuthActionTypes {
    Login = '[Login user] Action',
    Register = '[Register user] Action',
    Logout = "Logout"
}

export class Login implements Action {
    readonly type = AuthActionTypes.Login;
    constructor(public payload: { authToken: string, user: UserModel }) { }
}

export class Register implements Action {
    readonly type = AuthActionTypes.Register;
    constructor(public payload: { user: UserRegisterModel }) { }
}

export class Logout implements Action {
    readonly type = AuthActionTypes.Logout;
}

export type AuthActions = Login | Register | Logout;
