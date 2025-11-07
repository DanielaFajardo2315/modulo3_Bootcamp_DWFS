import { Routes } from '@angular/router';
// importar todos los componentes de la pagina
import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin';
import { Login } from './pages/login/login';
import { NotFound } from './pages/not-found/not-found';
import { Products } from './pages/products/products';
import { Register } from './pages/register/register';
// importar el guardian y especificar que rutas son protegidas
import { authGuard } from './guards/auth-guard';
import { Usuarios } from './pages/admin/usuarios/usuarios';
import { Inventario } from './pages/admin/inventario/inventario';

export const routes: Routes = [
  { path: '', component: Home, title: 'Inicio' },
  {
    path: 'administracion',
    component: Admin,
    title: 'Administración',
    canActivate: [authGuard],
    canActivateChild: [authGuard], //proteger las rutas hijas
    children: [
      {path: '', component: Usuarios},
      {path: 'inventario', component: Inventario} //title es opcional
    ],
  },
  { path: 'inicioSesion', component: Login, title: 'Inicio de sesión' },
  { path: 'productos', component: Products, title: 'Productos' },
  { path: 'registro', component: Register, title: 'Registro' },
  { path: '**', component: NotFound, title: '404' },
];
