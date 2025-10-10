import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials } from '../interfaces/credentials';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode'; //para decodificar el token y poder saber si inicio sesión un admin o no
import { Router } from '@angular/router'; //para redireccionar a otras páginas e iniciar sesión
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // 1. Inyectar y definir variables
  private _httpClient = inject(HttpClient);
  private _router = inject(Router);
  private apiUrl = environment.apiUrl;

  // 2. desarrollar la lógica del servicio

  // 2.1. petición POST
  login(loginCredentials: Credentials) {
    return this._httpClient.post(`${this.apiUrl}/login`, loginCredentials);
  }

  // 2.2. Decirle al navegador de donde va a obtener el token
  getToken() {
    // el token viene del localStorage que es un almacenamiento local
    return localStorage.getItem('token'); //obtenemos el token del navegador
  }
  // 2.3. Validar si es rol de administrador
  // este metodo retorna true o false dependiendo si es administrado o no
  isAdmin() {
    // obtener el token
    const token = this.getToken();

    // en caso de que si haya token, decodificarlo
    if (token) {
      const decoded : any = jwtDecode(token);

      return decoded.admin === true ? true : false;
    } else {
      console.log("No se encontró token");
      return false;
    }
  }

  // 2.4. redirección una vez se inició sesión
  redirectTo(){
    // si es administrador que redireccione a /admin
    if(this.isAdmin()){
      this._router.navigate(['/administracion']);
    } else {
      this._router.navigate(['/']);
    }
  }

  // 2.5. cierre de sesión
  logout(){
    localStorage.removeItem('token');
    alert('Cierre de sesión exitoso, vuelve pronto');
    this._router.navigate(['/inicioSesion']);
  }
}
