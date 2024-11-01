import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LayoutState } from "../layout.reducers";


export const selectLayoutState = createFeatureSelector<LayoutState>('layout');

export const selectLayoutLoading = createSelector(
    selectLayoutState,
    layouState => {
        return layouState?.isLoading || false;
    }
);
