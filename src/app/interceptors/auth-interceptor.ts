// Permite interceptar el token al iniciar sesión y se lo pasa a cada petición que necesite
import { HttpInterceptorFn } from '@angular/common/http';
import { LoginService } from '../services/login';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // pasar el token antes de que vayan al servidor
  const _loginService = inject(LoginService);
  const token = _loginService.getToken();

  const request = token ? req.clone({setHeaders: {Authorization: "Bearer" + token}}) : req;

  return next(request); //pasa la petición al back
};
