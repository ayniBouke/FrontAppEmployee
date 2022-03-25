import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsertEmployeePage } from './insert-employee.page';

const routes: Routes = [
  {
    path: '',
    component: InsertEmployeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsertEmployeePageRoutingModule {}
