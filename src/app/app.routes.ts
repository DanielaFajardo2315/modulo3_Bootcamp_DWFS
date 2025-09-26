import { Routes } from '@angular/router';
// importar todos los componentes de la pagina
import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin';
import { Login } from './pages/login/login';
import { NotFound } from './pages/not-found/not-found';
import { Products } from './pages/products/products';
import { Register } from './pages/register/register';

export const routes: Routes = [
  { path: '', component: Home, title: 'Inicio' },
  { path: 'administracion', component: Admin, title: 'Administración' },
  { path: 'inicioSesion', component: Login, title: 'Inicio de sesión' },
  { path: 'productos', component: Products, title: 'Productos' },
  { path: 'registro', component: Register, title: 'Registro' },
  { path: '**', component: NotFound, title: '404' }
];
