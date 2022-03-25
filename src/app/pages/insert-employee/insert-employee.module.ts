import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsertEmployeePageRoutingModule } from './insert-employee-routing.module';

import { InsertEmployeePage } from './insert-employee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsertEmployeePageRoutingModule
  ],
  declarations: [InsertEmployeePage]
})
export class InsertEmployeePageModule {}
