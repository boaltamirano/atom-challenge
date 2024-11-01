import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
    SplashScreenLoading = '[SplashScreen Loading] Action',
    ScreenLoading = '[Screen Loading] Action'
}

export class SplashScreenLoading implements Action {
    readonly type = LayoutActionTypes.SplashScreenLoading;
    constructor(public payload: { isSplashLoading: boolean }) { }
}

export class ScreenLoading implements Action {
    readonly type = LayoutActionTypes.ScreenLoading;
    constructor(public payload: { isLoading: boolean }) { }
}


export type LayoutActions =
    SplashScreenLoading |
    ScreenLoading;
