import { Component, inject } from '@angular/core';
// Formulario reactivo → cada cosa que el usuario escriba sea reconocido por el sistema
import {
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Credentials } from '../../interfaces/credentials';
import { LoginService } from '../../services/login';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private _loginService = inject(LoginService);

  loginForm = new FormGroup({
    emailLogin: new FormControl('', [Validators.required, Validators.email]),
    passwordLogin: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  // Manejo de eventos
  handleSubmit() {
    // const email = this.loginForm.value.emailLogin
    // const password = this.loginForm.value.passwordLogin
    // console.log(email, password);
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const loginCredentials: Credentials = {
      emailLogin: this.loginForm.value.emailLogin || '',
      passwordLogin: this.loginForm.value.passwordLogin || '',
    };
    console.log('Credenciales para login ', loginCredentials);

    // Lógica de la petición al back de inicio de sesión
    this._loginService.login(loginCredentials).subscribe({
      // manejo de la respuesta o error
      next: (res: any) => {
        console.log(res);
        if (res) {
          localStorage.setItem('token', res.token);
          // Mensaje de respueste
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.message,
            showConfirmButton: false,
            timer: 1500,
          });
          // Redirección
          this._loginService.redirectTo();
        }
      },
      error: (error: any) => {
        console.error(error.error.message);

        Swal.fire({
          title: 'Oops!',
          text: error.error.message,
          icon: 'error',
        });
      },
    });
  }
}
