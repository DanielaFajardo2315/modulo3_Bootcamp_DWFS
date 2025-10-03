import { Component, inject, OnInit } from '@angular/core';
// 1. Importar el servicio porque se va a hacer get de los productos
import { ProductsService } from '../../services/products';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card implements OnInit {
  // 1. Inyección de dependencias y declaración de variables
  _productService = inject(ProductsService);
  // Variable
  allProducts: Product[] = []; //almacenar todos los productos de la BD

  showProducts(){
    // 1. se hace la petición get
    // 2. se guardan los productos en la variable allProducts
    // 3. mostrar productos en el navegador

    this._productService.getProducts().subscribe({
      // manejo de errores → gestion de respuestas del back
      next: (response:any)=>{
        this.allProducts = response.data;
        console.log(this.allProducts);
      },

      error: (error:any)=>{
        console.error(error);
      } //respuesta de error
    });
    
  }
  ngOnInit(): void {
    // para ejecutar una acción al cargarse por primera vez el navegador
    this.showProducts();
  }
}
