import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModule } from 'src/app/shared/material.module';
import { CategorySelectComponent } from './category-select/category-select.component';
import { DealMethodSelectComponent } from './deal-method-select/deal-method-select.component';
import { ListingTimeSelectComponent } from './listing-time-select/listing-time-select.component';
import { UnitSelectComponent } from './unit-select/unit-select.component';

@NgModule({
  declarations: [CategorySelectComponent, DealMethodSelectComponent, ListingTimeSelectComponent, UnitSelectComponent],
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule, NgSelectModule],
  exports: [CategorySelectComponent, DealMethodSelectComponent, ListingTimeSelectComponent, UnitSelectComponent],
})
export class MainComponentsModule {}
