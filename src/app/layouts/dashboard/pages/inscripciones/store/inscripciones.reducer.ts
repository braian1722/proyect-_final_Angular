import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcionesActions } from './inscripciones.actions';
import { inscripciones } from '../modelos/inscripciones';
import { Usuarios } from '../../usuarios/modelos/usuarios';
import { Cursos } from '../../cursos/cursos.service';

export const inscripcionesFeatureKey = 'inscripciones';

export interface State {
  inscripciones: inscripciones[];
  loading: boolean;
  error: unknown; 

  loadEstudiantes: boolean
  estudiantes: Usuarios[];

  loadCursos: boolean,
  cursos: Cursos[]

}

export const initialState: State = {
  inscripciones: [],
  loading: false,
  error: null,

  loadEstudiantes: false,
  estudiantes: [],

  loadCursos: false,
  cursos: [],

};

export const reducer = createReducer(
  initialState,
  on(InscripcionesActions.loadInscripciones, state => ({...state,loading:true})),
  on(InscripcionesActions.loadInscripcionesSuccess, (state, action) => ({...state, loading: false, inscripciones: action.data})),
  on(InscripcionesActions.loadInscripcionesFailure, (state, action) => ({...state, loading: false, error: action.error})),

  on(InscripcionesActions.loadEstudiantes, state => ({...state,loadAlumnos:true})),
  on(InscripcionesActions.loadEstudiantesSuccess, (state, action) => ({...state, loadEstudiantes: false, estudiantes: action.data})),
  on(InscripcionesActions.loadEstudiantesFailure, (state, action) => ({...state, loadEstudiantes: false, error: action.error})),

  on(InscripcionesActions.loadCursos, state => ({...state,loadCursos:true})),
  on(InscripcionesActions.loadCursosSuccess, (state, action) => ({...state, loadCursos: false, cursos: action.data})),
  on(InscripcionesActions.loadCursosFailure, (state, action) => ({...state, loadCursos: false, error: action.error})),

  
);


export const inscripcionesFeature = createFeature({
  name: inscripcionesFeatureKey,
  reducer,
});

