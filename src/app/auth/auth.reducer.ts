import { AuthActions, IS_AUTHENTICATED, IS_UNAUTHENTICATED } from "./auth.actions";


export interface State {
    isAuthenticated: boolean;
}

const initialState: State = {
    isAuthenticated: false
}

export function AuthReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case IS_AUTHENTICATED:
            return {
                isAuthenticated: true
            }
        case IS_UNAUTHENTICATED:
            return {
                isAuthenticated: false
            }
        default:
            return state;
    }
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated;