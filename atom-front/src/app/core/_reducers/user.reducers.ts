import { UserModel } from 'src/app/core/_models/user.model';
import { UserActions, UserActionTypes } from './_actions/user.actions';


export interface UserState {
    profile: UserModel | null;
    isUserLoaded: boolean;
}

export const initialAuthState: UserState = {
    profile: new UserModel(),
    isUserLoaded: false,
};

export function userReducer(state = initialAuthState, action: UserActions): UserState {

    switch (action.type) {
        case UserActionTypes.UserLoaded: {
            const profile: UserModel = action.payload.user;
            return {
                profile: profile,
                isUserLoaded: true
            };
        }

        default:
            return state;
    }
}
