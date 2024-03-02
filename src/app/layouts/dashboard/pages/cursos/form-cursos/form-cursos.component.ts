import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-cursos',
  templateUrl: './form-cursos.component.html',
  styleUrl: './form-cursos.component.scss'
})
export class FormCursosComponent {

  @Output()
  cursoCreate = new EventEmitter();
  

  cursosForm: FormGroup;

  constructor( private fb: FormBuilder  ){
    this.cursosForm = this.fb.group({
      name: this.fb.control('',
        [ 
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ]),
      turno: this.fb.control('',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      diasCursada: this.fb.control('',Validators.required,),

      fechaInicio: this.fb.control('',Validators.required,),
    });
      
  }

  onSubmit(): void {
    if (this.cursosForm.invalid) {
      this.cursosForm.markAllAsTouched();
      alert("error en el ingreso de datos");
    } else {
      this.cursoCreate.emit(this.cursosForm.value);
      this.cursosForm.reset();
      alert("datos cargados corectamente");

    }
  }

}
