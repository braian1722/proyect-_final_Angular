import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private authService: AuthService ){
    this.loginForm = this.fb.group({
      email: fb.control('',[Validators.email,Validators.required]),
      password: fb.control('',[Validators.required])
    })
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      alert('error en el formulario');
    } else {
      console.log('formulario válido');
      this.authService.login(this.loginForm.value)
        .subscribe((success) => {
          if (success) {
            console.log('Inicio de sesión exitoso. Redirigiend');
          } else {
            alert('Inicio de sesión fallido. Verifica el usuario y la contraseña');
          }
        });
    }
  }

}
