import { NgModule } from '@angular/core';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    EmployeeComponent
  ],
  imports: [
    EmployeeRoutingModule,
    CommonModule,
  ],
  providers: [],
})
export class EmployeeModule { }
