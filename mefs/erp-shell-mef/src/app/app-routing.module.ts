import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'product',
    loadChildren: () => import('erp-products-mef/ProductModule').then(m => m.ProductModule)
  },
  {
    path: 'supply',
    loadChildren: () => import('erp-supply-mef/SupplyModule').then(m => m.SupplyModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('erp-employees-mef/EmployeeModule').then(m => m.EmployeeModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
