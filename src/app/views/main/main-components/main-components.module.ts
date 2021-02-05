import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModule } from 'src/app/shared/material.module';
import { CategorySelectComponent } from './category-select/category-select.component';
import { OfferTypeSelectComponent } from './offer-type-select/offer-type-select.component';
import { ListingTimeSelectComponent } from './listing-time-select/listing-time-select.component';
import { OffersTableComponent } from './offers-table/offers-table.component';
import { MyOffersTableComponent } from './my-offers-table/my-offers-table.component';
import { ProductOffersTableComponent } from './product-offers-table/product-offers-table.component';

@NgModule({
  declarations: [
    ProductFilterComponent,
    CategorySelectComponent,
    OfferTypeSelectComponent,
    ListingTimeSelectComponent,
    OffersTableComponent,
    MyOffersTableComponent,
    ProductOffersTableComponent,
  ],
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule, NgSelectModule],
  exports: [
    ProductFilterComponent,
    CategorySelectComponent,
    OfferTypeSelectComponent,
    ListingTimeSelectComponent,
    OffersTableComponent,
    MyOffersTableComponent,
    ProductOffersTableComponent,
  ],
})
export class MainComponentsModule {}
