import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscripcionesActions } from './inscripciones.actions';
import { InscripcionesService } from '../inscripciones.service';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { CursosService } from '../../cursos/cursos.service';


@Injectable()
export class InscripcionesEffects {

  loadInscripciones$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.loadInscripciones),
      concatMap(() =>
        
        this.inscripcionesService.getInscripciones().pipe(
          tap(data => console.log('Datos de inscripciones:', data)),
          map(data => InscripcionesActions.loadInscripcionesSuccess({ data })),
          catchError(error => of(InscripcionesActions.loadInscripcionesFailure({ error }))))
      )
    ); 
  });

  loadEstudiantes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.loadEstudiantes),
      concatMap(() =>
        
        this.usuariosService.getAllEstudiantes().pipe(
          map(data => InscripcionesActions.loadEstudiantesSuccess({ data })),
          catchError(error => of(InscripcionesActions.loadEstudiantesFailure({ error }))))
      )
    ); 
  });

  loadCursos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.loadCursos),
      concatMap(() =>
        this.cursosService.getAllCursos().pipe(
          map(data => InscripcionesActions.loadCursosSuccess({ data })),
          catchError(error => of(InscripcionesActions.loadCursosFailure({ error }))))
      )
    ); 
  });

  CrearInscripciones$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.crearInscripciones),
      concatMap((action) =>
        this.inscripcionesService.createInscripciones(action.data).pipe(
          map(data => InscripcionesActions.crearInscripcionesSuccess({ data })),
          catchError(error => of(InscripcionesActions.crearInscripcionesFailure({ error }))))
      )
    ); 
  });

  crearCursosSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.crearInscripcionesSuccess),
      map(() => InscripcionesActions.loadInscripciones())//se actualize el array en el html
    );
  });


  constructor(
    private actions$: Actions,
    private inscripcionesService: InscripcionesService,
    private usuariosService: UsuariosService,
    private cursosService: CursosService
    ) {}
}
