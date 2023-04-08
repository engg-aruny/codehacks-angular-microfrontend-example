import { NgModule } from '@angular/core';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';

@NgModule({
  declarations: [
    EmployeeComponent
  ],
  imports: [
    EmployeeRoutingModule
  ],
  providers: [],
})
export class EmployeeModule { }
