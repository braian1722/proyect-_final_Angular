import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { UsuariosModule } from './pages/usuarios/usuarios.module';
import { HomeModule } from './pages/home/home.module';
import { InscripcionesModule } from './pages/inscripciones/inscripciones.module';
import { CursosModule } from './pages/cursos/cursos.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    UsuariosModule,
    HomeModule,
    InscripcionesModule,
    CursosModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
