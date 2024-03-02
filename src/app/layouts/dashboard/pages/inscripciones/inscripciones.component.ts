import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { inscripciones } from './modelos/inscripciones';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { selectEstudiantes, selectInscripciones } from './store/inscripciones.selectors';
import { InscripcionesActions } from './store/inscripciones.actions';
import { InscripcionesService } from './inscripciones.service';
import { Usuarios } from '../usuarios/modelos/usuarios';
import { FormInscripComponent } from './form-inscrip/form-inscrip.component';
import { LoginService } from '../../../../core/servicios/login.service';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss'
})
export class InscripcionesComponent implements OnDestroy {

  displayedColumns: string[] = [
  'id',
  'usuarioId',
  'fullName',
  'cursoId',
  'name', 
  'turno',
  'diasCursada',
  'fechaInicio',
  'acciones'
  
];

  inscripciones: inscripciones[] = [];
  
  user: Usuarios[] = [];

  suscription?: Subscription;

  constructor(
    private store: Store,
    private matDialog: MatDialog,
    private loginService: LoginService,
    private inscripcionesService: InscripcionesService
    ){
    this.store.dispatch(InscripcionesActions.loadInscripciones()),
    
    
    this.suscription =  this.store.select(selectInscripciones).subscribe({
      next:(inscripciones)=>{
        console.log('Inscripciones:', inscripciones);
        this.inscripciones = inscripciones;
      } 
    })

    this.suscription.add(this.store.select(selectEstudiantes).subscribe({
      next: (estudiantes) => {
        this.user = estudiantes;
      }
    }));
    
  }

  ngOnDestroy(): void {
    this.suscription?.unsubscribe()
  }

  createinscripciones(): void{
    this.matDialog.open(FormInscripComponent)
  }

  onDeleteinscrip(evento:inscripciones){  
    this.loginService.setIsLogin(true);
    
    this.inscripcionesService.deleteInscripciones(evento.id).subscribe({
      next:(inscrip)=>{
        this.inscripciones = [...inscrip];
      },
      complete:()=>{
        this.loginService.setIsLogin(false);
        alert('inscripcion eliminada')
      }
    })
  }


}
