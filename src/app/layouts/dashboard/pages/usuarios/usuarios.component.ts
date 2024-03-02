import { Component, OnInit } from '@angular/core';
import { Usuarios } from './modelos/usuarios';
import { UsuariosService } from './usuarios.service';
import { LoginService } from '../../../../core/servicios/login.service';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit  {

  displayedColumns: string[] = ['id', 'fullName', 'email', 'password', 'role','acciones'];

  dataSource: Usuarios[] =[];
  rolesData: string[] = [];

  
  constructor(
    private userService: UsuariosService,
    private loginService: LoginService,
    private authService: AuthService
    ){}




  ngOnInit(): void {
    setTimeout(() => {
      this.getPageData();
      
    });

    
    
  }

  getPageData(): void{
    this.loginService.setIsLogin(true);
    
    forkJoin([
      this.userService.getRoles(),
      this.userService.getUsers()
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

  onUserSudmited(evento: Usuarios): void{ 
    this.loginService.setIsLogin(true);
    this.userService.createUser(evento).subscribe({
      next:(users)=>{
        this.dataSource = [...users];//le damos un nuevo array
      },
      complete:()=>{
        this.loginService.setIsLogin(false);
      }
    })
  }

  onDeleteUser(evento:Usuarios){  
    this.loginService.setIsLogin(true);
    
    this.userService.deleteUser(evento.id).subscribe({
      next:(users)=>{
        this.dataSource = [...users];
      },
      complete:()=>{
        this.loginService.setIsLogin(false);
        alert('usuario eliminado')
      }
    })
  }
  getUserId(evento: Usuarios): void {
    this.loginService.setIsLogin(true);
  
    this.userService.getUserById(evento.id).subscribe({
      next: (usuario: Usuarios | undefined) => {
        if (usuario) {
          this.dataSource = [usuario];
        } else {
        }
      },
      complete: () => {
        this.loginService.setIsLogin(false);
      },
      error: (error) => {
        console.error('Error al obtener el usuario por ID:', error);
        this.loginService.setIsLogin(false); 
      },
    });
  }

}
 