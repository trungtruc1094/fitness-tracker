
import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

// Step 1
export interface State {
    ui: fromUi.State,
    auth: fromAuth.State
}

// Step 2
export const reducers: ActionReducerMap<State> = {
    ui: fromUi.uiReducer,
    auth: fromAuth.AuthReducer
}

// Get ui from step 1, as returned by Step 2
export const getUiState = createFeatureSelector<fromUi.State>('ui');
// Get getIsLoading value from getIsLoading function inside ui.reducer.ts
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.getIsAuthenticated);


