import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Usuarios } from '../../usuarios/modelos/usuarios';
import { Cursos } from '../../cursos/cursos.service';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material/dialog';
import { InscripcionesActions } from '../store/inscripciones.actions';
import { selectCursos, selectEstudiantes, selectInscripcionesState } from '../store/inscripciones.selectors';

@Component({
  selector: 'app-form-inscrip',
  templateUrl: './form-inscrip.component.html',
  styleUrl: './form-inscrip.component.scss'
})
export class FormInscripComponent {

  estudiantes$: Observable<Usuarios[]>;//declaramos un observable de tipo usuarios []
  cursos$: Observable<Cursos[]>

  inscripcionesForm: FormGroup

  constructor(
    private store: Store,
    private formBuiler: FormBuilder,
    private matDialogRed: MatDialogRef<FormInscripComponent>
    ){

    this.inscripcionesForm = this.formBuiler.group({
      usuarioId: this.formBuiler.control(''),// agregarle validadores
      cursoId: this.formBuiler.control('')

    })



    this.store.dispatch(InscripcionesActions.loadEstudiantes())//disparemos una accion
    this.store.dispatch(InscripcionesActions.loadCursos())

    this.estudiantes$ = this.store.select(selectEstudiantes);//llamamos al selector
    this.cursos$ = this.store.select(selectCursos)
  }
 
  onSubmit(): void {
    if (this.inscripcionesForm.invalid) {
      this.inscripcionesForm.markAllAsTouched();
    } else {
      this.store.dispatch(InscripcionesActions.crearInscripciones({data: this.inscripcionesForm.value}))//madamos la data del formulario
      this.matDialogRed.close()
    }
  }

}

