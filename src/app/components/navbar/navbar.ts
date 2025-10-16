import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login';

@Component({
  selector: 'app-navbar', //La etiqueta de HTML
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  private _loginService = inject(LoginService);
  isVisible: boolean = this._loginService.isAdmin();
}
