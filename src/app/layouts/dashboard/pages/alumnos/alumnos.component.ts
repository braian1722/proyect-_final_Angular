import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios/usuarios.service';
import { LoginService } from '../../../../core/servicios/login.service';
import { AuthService } from '../../../auth/auth.service';
import { Usuarios } from '../usuarios/modelos/usuarios';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss'
})
export class AlumnosComponent implements OnInit{

  displayedColumns: string[] = ['id', 'fullName', 'email', 'password', 'role'];

  dataSource: Usuarios[] =[];
  rolesData: string[] = [];
  isEstudiante: boolean = false;
  
  constructor(
    private userService: UsuariosService,
    private loginService: LoginService,
    private authService: AuthService
    ){}




  ngOnInit(): void {

    setTimeout(() => {
      this.getPageData();
      this.isEstudiante = this.authService.authUser?.role === 'ESTUDIANTES';
    });
  }

  getPageData(): void{
    this.loginService.setIsLogin(true);
    
    forkJoin([
      this.userService.getRoles(),
      this.userService.getAllEstudiantes(),
    ]).subscribe({
      next: (value) =>{
        this.rolesData = value[0];
        this.dataSource = value[1];
        
      },
      complete: ()=>{
        this.loginService.setIsLogin(false);
      }
    }) 
  }

}
