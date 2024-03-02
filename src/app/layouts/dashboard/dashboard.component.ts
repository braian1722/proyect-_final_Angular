import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Usuarios } from './pages/usuarios/modelos/usuarios';
import { selectAuthUser } from '../auth/store/auth.selectores';
import { Store } from '@ngrx/store';
import { AuthActions } from '../auth/store/auth.acciones';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false; 
  authUser$: Observable<Usuarios | null>;
  

  constructor(private authService: AuthService ,private store: Store){
    this.authUser$ = this.store.select(selectAuthUser)
  }

  logOut():void{
    this.authService.logOut();
  }

}
