import { Component, OnInit } from '@angular/core';
import { Cursos, CursosService } from './cursos.service';
import { LoginService } from '../../../../core/servicios/login.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'turno', 'diasCursada', 'fechaInicio','acciones'];

  dataSource: Cursos[] =[];

  isAdmin:boolean = false;

  constructor(
    private cursosService : CursosService,
    private loginService: LoginService,
    private authService: AuthService
    ){}

  ngOnInit(): void {

    setTimeout(() => {
      this.getPageData();
      this.isAdmin = this.authService.authUser?.role === 'ADMIN';
    });
  }
  getPageData(): void{
    this.loginService.setIsLogin(true);// implementando ambos servicios
      this.cursosService.getCursos().subscribe({
      next: (cursos) =>{
        this.dataSource = cursos;
      },
      complete: ()=>{
        this.loginService.setIsLogin(false);
      }
    }) 

  }
  onCursosSudmited(evento: Cursos): void{ 
    this.loginService.setIsLogin(true);
    this.cursosService.createCurso(evento).subscribe({
      next:(cursos)=>{
        this.dataSource = [...cursos];
      },
      complete:()=>{
        this.loginService.setIsLogin(false);
        
      }
    })
  }

  onDeleteCursos(evento:Cursos){ 
    this.loginService.setIsLogin(true);
    
    this.cursosService.deleteCurso(evento.id).subscribe({
      next:(cursos)=>{
        this.dataSource = [...cursos];
      },
      complete:()=>{
        this.loginService.setIsLogin(false);
        alert("curso eliminado")
      }
    })
  }

  getCursoId(evento: Cursos): void {
    this.loginService.setIsLogin(true);
  
    this.cursosService.getCursosById(evento.id).subscribe({
      next: (curso: Cursos | undefined) => {
        if (curso) {
          this.dataSource = [curso];
        } else {
        }
      },
      complete: () => {
        this.loginService.setIsLogin(false);
      },
      error: (error) => {
        console.error('Error al obtener el curso por ID:', error);
        alert("erro al obtener id")
        this.loginService.setIsLogin(false); 
      },
    });
  }

} 
