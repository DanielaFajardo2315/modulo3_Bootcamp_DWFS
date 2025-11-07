import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users';
import { User } from '../../../interfaces/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  imports: [],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios {
  private _usersService = inject(UsersService);
  allUsers: User[] = [];

  // 2. Formgroups y formcontrols que necesite

  // 3. métodos que le permitan hacer las peticiones y gestionar la respuesta
  showUsers() {
    // petición POST
    this._usersService.getUsers().subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.allUsers = resp.data;
      },
      error: (error: any) => {
        console.error(error.error.message);
      },
    });
  }

  deleteUser(id: string) {
    // petición DELETE
    this._usersService.deleteUser(id).subscribe({
      next: (resp: any) => {
        Swal.fire({
          title: 'Usuario eliminado',
          text: resp.message,
          icon: 'success',
        }).then(() => {
          this.showUsers();
        });
      },
      error: (error: any) => {
        console.error(error.error.message);
      },
    });
  }
  updateUser(id: string, userToUpdate: User) {
    // petición PUT
    // ... tomar como referencia el registro de usuarios

    this._usersService.putUser(userToUpdate, id).subscribe({
      next: (resp: any) => {
        Swal.fire({
          title: 'Usuario actualizado',
          text: resp.message,
          icon: 'success',
        }).then(() => {
          this.showUsers();
        });
      },
      error: (error: any) => {
        console.error(error.error.message);
      },
    });
  }

  ngOnInit(): void {
    this.showUsers();
  }
}
