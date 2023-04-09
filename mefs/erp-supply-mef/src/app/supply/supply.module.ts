import { NgModule } from '@angular/core';
import { SupplyComponent } from './supply.component';
import { SupplyRoutingModule } from './supply-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SupplyComponent
  ],
  imports: [
    SupplyRoutingModule,
    CommonModule
  ],
  providers: [],
})
export class SupplyModule { }
