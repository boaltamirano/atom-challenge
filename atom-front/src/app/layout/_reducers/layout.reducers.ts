import { LayoutActions, LayoutActionTypes } from "./_actions/layout.actions";

export interface LayoutState {
    isLoading: boolean,
    isSplashLoading: boolean,
    breadcrumbs: {
        title: string | null
        btnText: string | null,
        btnAction: (() => void) | null
    },
    backgroundWhiteActive: boolean,
    menuFiltersShow: boolean,
    menuFooterShow: boolean

}

export const initialLayoutState: LayoutState = {
    isLoading: false,
    isSplashLoading: false,
    breadcrumbs: {
        title: null,
        btnText: null,
        btnAction: null
    },
    backgroundWhiteActive: false,
    menuFiltersShow: false,
    menuFooterShow: true,
}

export function layoutReducer(state = initialLayoutState, action: LayoutActions): LayoutState {
    switch (action.type) {
        case LayoutActionTypes.ScreenLoading: {
            //step 2
            return {
                ...state,
                isLoading: action.payload.isLoading
            }
        }

        case LayoutActionTypes.SplashScreenLoading: {
            return {
                ...state,
                isSplashLoading: action.payload.isSplashLoading
            }
        }

        default:
            return state;
    }

}
