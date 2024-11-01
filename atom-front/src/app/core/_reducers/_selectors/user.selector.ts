import { createSelector } from '@ngrx/store';
import { UserState } from '../user.reducers';
import { UserModel } from '../../_models/user.model';

export const selectUserState = (state: any) => <UserState>state.user;

export const currentUser = createSelector(selectUserState, user => new UserModel(user.profile));