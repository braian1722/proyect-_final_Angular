import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  CrearInscripcionesData, inscripciones } from "./modelos/inscripciones";
import { environment } from "../../../../../enviroment/enviroment";
import { Observable, mergeMap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class InscripcionesService {
    
    constructor(private http: HttpClient) {}

    getInscripciones(){
        return this.http.get<inscripciones[]>(`${environment.apiURL}/inscripciones?_embed=usuario&_embed=curso`)
        //para mostrar agregamos a sales la documentacion de json server
    }

    createInscripciones(data: CrearInscripcionesData) {
        return this.http.post<inscripciones[]>(`${environment.apiURL}/inscripciones`, data);
        //creamos y enviamos los datos a la base de datos
    }

    deleteInscripciones(id: string | number) {
        return this.http.delete<inscripciones>(`${environment.apiURL}/inscripciones/${id}`).pipe(
        mergeMap(() => this.getInscripciones())
        );
      }




} 