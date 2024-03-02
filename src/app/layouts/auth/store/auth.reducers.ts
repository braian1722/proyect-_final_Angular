import { createReducer, on } from "@ngrx/store";
import { Usuarios } from "../../dashboard/pages/usuarios/modelos/usuarios";
import { AuthActions } from "./auth.acciones";


export const featureName = 'auth'

export interface AuthState {
    user: Usuarios | null;
}

const initialState: AuthState = {
    user: null,
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.setAuthUser, (state, action) => {
      return {
        ...state,
        user: action.user
      };
    }),
    on(AuthActions.logout, () => initialState)
  );