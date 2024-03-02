import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Usuarios } from "../../dashboard/pages/usuarios/modelos/usuarios";


export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
      'Set auth user': props<{ user: Usuarios }>(),
      logout: emptyProps(),
    },
  });