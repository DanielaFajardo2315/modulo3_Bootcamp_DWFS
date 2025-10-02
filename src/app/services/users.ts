import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  postUser(userToCreate: User){
    return this._httpClient.post(this.apiUrl + '/users/', userToCreate);
  };
  
  getUsers(){
    return this._httpClient.get(this.apiUrl + '/users/');
  };

  putUser(userToUpdate: User, id: string){
    return this._httpClient.put(this.apiUrl + '/users/', userToUpdate, {params:{id}});
  };

  deleteUser(id: string){
    return this._httpClient.delete(this.apiUrl + '/users/', {params:{id}});
  };
}
