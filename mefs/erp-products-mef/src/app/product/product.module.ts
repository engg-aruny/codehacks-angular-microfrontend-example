import { NgModule } from '@angular/core';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    ProductRoutingModule
  ],
  providers: [],
})
export class ProductModule { }
