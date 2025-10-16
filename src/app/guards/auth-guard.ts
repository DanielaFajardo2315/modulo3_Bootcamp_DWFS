// los guards son para proteger contenido del front
// CanActivate → protege rutas completas → true o false
// true → deja acceder y muestra el contenido
// false → no se puede mostrar el contenido

import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _loginService = inject(LoginService);
  const _router = inject(Router);

  // VALIDACIÓN 1. Si inició sesión
  if(!_loginService.isLoggedIn()){
    //redireccione al inicio de sesión y retorne false
    alert('No has iniciado sesión');
    _router.navigate(['/inicioSesion']);
    return false;
  }

  // VALIDACIÓN 2. Si es administrador
  if(!_loginService.isAdmin()){
    alert('No tienes permitido accceder a esta página, serás redireccionado al inicio')
    _router.navigate(['/']);
    return false;
  }
  return true;
};
