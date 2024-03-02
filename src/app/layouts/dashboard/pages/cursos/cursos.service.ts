import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, mergeMap, of } from 'rxjs';
import { environment } from '../../../../../enviroment/enviroment.prod';



export interface Cursos {
  id: number;
  name: string;
  turno: string;
  diasCursada: string;
  fechaInicio: Date;
}

let CURSOS_DB:Cursos[]= []

@Injectable({
  providedIn: 'root' 
})
export class CursosService {

  constructor(private httpClient: HttpClient) {
  
  }
  getCursos(){ 
    return this.httpClient.get<Cursos[]>(`${environment.apiURL}/cursos`).pipe(delay(2000))
  }

  createCurso(dataLoad: Cursos){

    return this.httpClient.post<Cursos[]>(`${environment.apiURL}/cursos`,dataLoad).pipe(
      mergeMap(()=> this.getCursos())
    )
  
  }

  deleteCurso(userID: number){ 
    return this.httpClient.delete<Cursos>(`${environment.apiURL}/cursos/${userID}`).pipe(
      mergeMap(()=> this.getCursos())
    )
  }
  getCursosById(id:number | string): Observable<Cursos | undefined>{
    return this.httpClient.get<Cursos>(`${environment.apiURL}/cursos/${id}`);
    }


  getAllCursos(): Observable<Cursos[]> {
    return this.httpClient.get<Cursos[]>(
    `${environment.apiURL}/cursos`
    );
    }


}
