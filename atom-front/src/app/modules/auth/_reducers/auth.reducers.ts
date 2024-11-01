
import { AuthActionTypes, AuthActions } from "./_actions/auth.actions";

export interface AuthState {
    loggedIn: boolean;
    authToken: string;
    isUserLoaded: boolean;
}

export const initialAuthState: AuthState = {
    loggedIn: false,
    authToken: '',
    isUserLoaded: false
};

export function authReducer(state: typeof initialAuthState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.Login: {
            return {
                ...state,
                loggedIn: true,
                authToken: action.payload.authToken,
                isUserLoaded: false
            }
        }

        case AuthActionTypes.Logout:
            return initialAuthState;

        default:
            return state;
    }

}
