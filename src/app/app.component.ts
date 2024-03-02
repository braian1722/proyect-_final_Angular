import { Component } from '@angular/core';
import { LoginService } from './core/servicios/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'proyecto_final';

  isLoagin:boolean = false;

  constructor(private loaginService :LoginService){
    this.loaginService.isLoading$.subscribe({
      next: (value) => this.isLoagin = value
    })
  }
}
