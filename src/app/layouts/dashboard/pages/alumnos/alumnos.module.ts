import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AlumnosComponent } from './alumnos.component';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [
    AlumnosComponent
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    SharedModule
  ],
  exports:[
    AlumnosComponent
  ]
})
export class AlumnosModule { }
