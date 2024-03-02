import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CrearInscripcionesData, inscripciones } from '../modelos/inscripciones';
import { Usuarios } from '../../usuarios/modelos/usuarios';
import { Cursos } from '../../cursos/modelos/cursos';

export const InscripcionesActions = createActionGroup({
  source: 'Inscripciones',
  events: { 
    'Load Inscripciones': emptyProps(),
    'Load Inscripciones Success': props<{ data: inscripciones[] }>(),
    'Load Inscripciones Failure': props<{ error: unknown }>(),

    'Load estudiantes': emptyProps(),//disparador
    'Load estudiantes Success': props<{ data: Usuarios[] }>(),
    'Load estudiantes Failure': props<{ error: unknown }>(),

    'Load cursos': emptyProps(),//disparador
    'Load cursos Success': props<{ data: Cursos[] }>(),
    'Load cursos Failure': props<{ error: unknown }>(),

    'crear inscripciones': props<{data: CrearInscripcionesData}>(),//disparador
    'crear inscripciones Success': props<{ data: inscripciones[] }>(),
    'crear inscripciones Failure': props<{ error: unknown }>(),
  }
});
