export interface Product {
    _id: string; //se usa porque se realizan consultas por id
    image: string;
    title: string;
    description?: string; //se le pone ? cuando no es requerido
    material: string;
    height: number;
    price: number;
    categories?: string;
    isAvailable?: boolean;
}
