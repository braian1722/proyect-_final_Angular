import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
          path: 'login', 
          component: LoginComponent
      }
  ])
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
