import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscripcionesRoutingModule } from './inscripciones.routing.module';
import { InscripcionesComponent } from './inscripciones.component';
import { InscripcionesEffects } from './store/inscripciones.effects';
import { inscripcionesFeature } from './store/inscripciones.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../../../../shared/shared.module';
import { FormInscripComponent } from './form-inscrip/form-inscrip.component';


@NgModule({
  declarations: [
    InscripcionesComponent,
    FormInscripComponent
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    StoreModule.forFeature(inscripcionesFeature),
    EffectsModule.forFeature([InscripcionesEffects]),
    SharedModule
  ],
  exports:[
    InscripcionesComponent,
    FormInscripComponent
  ],
  
})
export class InscripcionesModule { }
