import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from './product.component';
import { ModalCreateHopeComponent } from './modal-create-hope/modal-create-hope.component';
import { HopesTableComponent } from './hopes-table/hopes-table.component';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MainComponentsModule } from '../../main-components/main-components.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

const routes: Routes = [{ path: '', component: ProductComponent }];

@NgModule({
  declarations: [ProductComponent, ModalCreateHopeComponent, HopesTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgSelectModule,
    MainComponentsModule,
    PerfectScrollbarModule,
  ],
})
export class ProductModule {}
