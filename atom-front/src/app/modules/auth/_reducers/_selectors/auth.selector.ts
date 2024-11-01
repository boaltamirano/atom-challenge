import { createSelector } from '@ngrx/store';

export const selectAuthState = (state: any) => state.auth;

export const isLoggedIn = createSelector(selectAuthState, auth => auth.loggedIn);

export const isLoggedOut = createSelector(isLoggedIn, loggedIn => !loggedIn);

export const currentAuthToken = createSelector(selectAuthState, auth => auth.authToken);
