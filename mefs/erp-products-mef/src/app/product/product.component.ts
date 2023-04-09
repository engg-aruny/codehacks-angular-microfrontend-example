import { Component } from '@angular/core';

interface Product {
  name: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  products: Product[] = [
    { name: 'Product 1', description: 'Description 1', price: 19.99 },
    { name: 'Product 2', description: 'Description 2', price: 29.99 },
    { name: 'Product 3', description: 'Description 3', price: 39.99 }
  ];

  addProduct() {
    const newProduct: Product = { name: 'New Product', description: '', price: 0 };
    this.products.push(newProduct);
  }
}
