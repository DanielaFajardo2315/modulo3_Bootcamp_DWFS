// Los servicios son lógica accesible desde cualquier parte de un proyecto
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // 1. Inyección de dependencias y/o directivas de Angular
  private _httpClient = inject(HttpClient);

  // 2. Definir la ruta de acceso al back
  private apiUrl = environment.apiUrl; //url general del backend

  // 3. Metodo para hacer las peticiones

  // petición Post
  postProduct(productToCreate: Product){
    return this._httpClient.post(this.apiUrl + '/products/crear', productToCreate);
  };
  // petición Get
  getProducts(){
    return this._httpClient.get(this.apiUrl + '/products/mostrar');
  };
  // petición Put
  putProduct(productToUpdate: Product, id: string){
    return this._httpClient.put(this.apiUrl + '/products/actualizar/' + id, productToUpdate); //También se puede con backsticks
  };
  // petición Delete
  deleteProduct(id: string){
    return this._httpClient.delete(this.apiUrl + '/products/eliminar/', {params: {id}}); //Opción 3
  };
}
