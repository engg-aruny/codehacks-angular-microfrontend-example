import { Component, OnInit } from '@angular/core';

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
export class ProductComponent implements OnInit {
  products: Product[] = [
    { name: 'Product 1', description: 'Description 1', price: 19.99 },
    { name: 'Product 2', description: 'Description 2', price: 29.99 },
    { name: 'Product 3', description: 'Description 3', price: 39.99 }
  ];

  //product microfrontend
  ngOnInit(): void {
    window.addEventListener('product_mef_delete_event', (e: any) => {
      console.log(e.detail.name);
      var foundProduct = this.products.find(x => x.name === e.detail.name);
      const indexToRemove = this.products.indexOf(foundProduct!);
      if (indexToRemove !== -1) { // Check if the element exists in the array
        this.products.splice(indexToRemove, 1); // Remove one element at the found index
      } else {
        window.alert("Product 1 not found")
      }
    });
  }

  addProduct() {
    const newProduct: Product = { name: 'New Product', description: '', price: 0 };
    this.products.push(newProduct);
  }
}
