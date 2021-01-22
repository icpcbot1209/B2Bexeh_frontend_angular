import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ModalCreateOfferComponent } from './modal-create-offer/modal-create-offer.component';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MainComponentsModule } from '../../main-components/main-components.module';

const routes: Routes = [{ path: '', component: ProductComponent }];

@NgModule({
  declarations: [ProductComponent, ModalCreateOfferComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule, MaterialModule, NgSelectModule, MainComponentsModule],
})
export class ProductModule {}
