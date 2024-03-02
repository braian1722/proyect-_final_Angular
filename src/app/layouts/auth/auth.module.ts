import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { authReducer, featureName } from './store/auth.reducers';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
  ],
  exports:[
    LoginComponent
  ]
})
export class AuthModule { }
