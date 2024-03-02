import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { adminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'usuarios',
        canActivate: [adminGuard],
        loadChildren:()=>import('./pages/usuarios/usuarios.module').then((m) => m.UsuariosModule)
      },
      {
        path: 'alumnos', 
        loadChildren:()=>import('./pages/alumnos/alumnos.module').then((m) => m.AlumnosModule)
      },
      {
        path: 'cursos',
        loadChildren: () => import ('./pages/cursos/cursos.module').then((m)=>m.CursosModule)
      },
      {
        path: 'home',
        loadChildren: () => import ('./pages/home/home.module').then((m)=>m.HomeModule)
      },
      {
        path: 'inscripciones',
        loadChildren: () => import ('./pages/inscripciones/inscripciones.module').then((m)=>m.InscripcionesModule)
      }
    ]
    
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
