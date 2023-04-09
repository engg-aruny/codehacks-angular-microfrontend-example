import { Component } from '@angular/core';

interface Supply {
  name: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.css']
})
export class SupplyComponent {
  supplies: Supply[] = [
    { name: 'Pen', quantity: 10, price: 2.99 },
    { name: 'Notebook', quantity: 5, price: 4.99 },
    { name: 'Highlighter', quantity: 3, price: 1.99 }
  ];

  addSupply() {
    const newSupply: Supply = { name: 'New Supply', quantity: 0, price: 0 };
    this.supplies.push(newSupply);
  }
}
