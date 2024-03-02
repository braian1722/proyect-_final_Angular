import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, of, tap } from "rxjs";
import { Usuarios } from "../dashboard/pages/usuarios/modelos/usuarios";

import { AuthActions } from "./store/auth.acciones";
import { Router } from "@angular/router";
import { LoginService } from "../../core/servicios/login.service";
import { Store } from "@ngrx/store";
import { environment } from "../../../enviroment/enviroment";

interface loginData {
  email: null | string ;
  password: null | string;
}


@Injectable({
  providedIn: 'root'
})



export class AuthService {

  authUser: Usuarios | null = null;


  constructor(
    private router: Router,
    private loginService: LoginService,
    private httpClient: HttpClient,
    private store: Store)
    { }

  private setOutUser(user: Usuarios): void {
    this.authUser = user;
    this.store.dispatch(AuthActions.setAuthUser({user}))
    localStorage.setItem('token', user.token);
    
  }

  login(data: loginData): Observable<Usuarios[]>{

    return this.httpClient.get<Usuarios[]>(//la peticion nos va devolver un array
      `${environment.apiURL}/usuarios?email=${data.email}&password=${data.password}`
      ).pipe(
        tap((respuesta)=>{
          if(!!respuesta[0]){//si en la res hay datos en la posicion 0
            this.setOutUser(respuesta[0])
            this.router.navigate(['dashboard','home']);//al ingresar lo mandamos al home
          }else{
            console.log("error")
          }

        })
      )
      


    
  }

  logOut(): void{
    this.authUser = null;
    this.router.navigate(['auth','login']); //redireccionamos y limpiamos el usuarario
    localStorage.removeItem('token');//borramos el token de acceso
  }

  verificarToke(){

    return this.httpClient
    .get<Usuarios[]>(
      `${environment.apiURL}/usuarios?token=${localStorage.getItem('token')}`//verifica que el token del user exista
    ).pipe(
      map((response)=>{//nos permite transfomar un array para devolver un true para el guard
          if(response.length){
            this.setOutUser(response[0]);
            return true;
          }else{
            this.authUser = null;
            localStorage.removeItem('token') //removemos el token 
            return false
          }
      })
    )
  }
}
