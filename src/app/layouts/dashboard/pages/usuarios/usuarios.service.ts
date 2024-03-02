import { Injectable } from "@angular/core";
import { Usuarios } from "./modelos/usuarios";
import { environment } from "../../../../../enviroment/enviroment.prod";
import { HttpClient } from "@angular/common/http";
import { Observable, delay, mergeMap, of } from "rxjs";

const ROLES_DB: string[]=[
    'ADMIN',
    'USUARIO',
    'ESTUDIANTES'
];

 
let USERS_DD: Usuarios[]= []; 

@Injectable({
    providedIn: 'root' // esto significa que por defaut nuetro servicio puede ser usado en toda la aplicacion
})
export class UsuariosService {

    constructor(private httpClient: HttpClient) {}


    getUsers(){ 
        return this.httpClient.get<Usuarios[]>(`${environment.apiURL}/usuarios`).pipe(delay(2000))
    }

    getRoles(): Observable <string[]>{
        return of (ROLES_DB).pipe(delay(2000));
    }

    createUser(dataLoad: Usuarios){
    return this.httpClient.post<Usuarios[]>(`${environment.apiURL}/usuarios`,dataLoad).pipe(
        mergeMap(()=> this.getUsers())
    )
    
    }

    deleteUser (userID: number){ 

    return this.httpClient.delete<Usuarios>(`${environment.apiURL}/usuarios/${userID}`).pipe(
        mergeMap(()=> this.getUsers())
    )
    }

    getUserById(id:number | string): Observable<Usuarios | undefined>{
    return this.httpClient.get<Usuarios>(`${environment.apiURL}/usuarios/${id}`);
    }

    
    getAllEstudiantes(): Observable<Usuarios[]> {
        return this.httpClient.get<Usuarios[]>(
        `${environment.apiURL}/usuarios?role=ESTUDIANTES`
    );
    }
}