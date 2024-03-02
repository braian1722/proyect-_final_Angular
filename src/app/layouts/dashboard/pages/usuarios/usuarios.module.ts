import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { SharedModule } from '../../../../shared/shared.module';
import { FormUsuariosComponent } from './form-usuarios/form-usuarios.component';


@NgModule({
  declarations: [
    UsuariosComponent,
    FormUsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule
  ],
  exports:[
    UsuariosComponent,
    FormUsuariosComponent
  ]
})
export class UsuariosModule { }
