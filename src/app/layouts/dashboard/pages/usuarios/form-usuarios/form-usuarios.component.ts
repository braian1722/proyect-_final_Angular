import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrl: './form-usuarios.component.scss'
})
export class FormUsuariosComponent {

  @Output()
  userCreate = new EventEmitter();
  

  userForm: FormGroup;

  constructor( private fb: FormBuilder  ){
    this.userForm = this.fb.group({
      firstName: this.fb.control('',
        [ 
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ]),
      lastName: this.fb.control('',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      email: this.fb.control('',
      [
        Validators.required,
        Validators.email,
      ]),
      password: this.fb.control('',
      [
        Validators.required,
        Validators.minLength(8),
      ]),
      role: this.fb.control('', Validators.required),
      

    });
      
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      alert("error en el ingreso de datos");
    } else {
      this.userCreate.emit(this.userForm.value);
      this.userForm.reset();
      alert("datos cargados corectamente");
    }
  }

}
