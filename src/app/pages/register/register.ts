import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../interfaces/user';
import { UsersService } from '../../services/users';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private _userService = inject(UsersService);
  private _router = inject(Router);

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl<number | null>(null),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s]).{8,}$/),
    ]),
  });

  handleSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const userData: User = {
      _id: '',
      name: this.registerForm.value.name || '',
      username: this.registerForm.value.username || '',
      email: this.registerForm.value.email || '',
      age: this.registerForm.value.age || 0,
      password: this.registerForm.value.password || '',
      role: 'user',
    };
    console.log('Datos del usuario: ', userData);

    this._userService.postUser(userData).subscribe({
      next: (res: any) => {
        console.log(res);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          timer: 1500,
        }).then(() => {
          this._router.navigate(['/inicioSesion']);
        });
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
