import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductFilterComponent } from "./product-filter/product-filter.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { ProductTableComponent } from "./product-table/product-table.component";
import { BootstrapModule } from "src/app/components/bootstrap/bootstrap.module";
import { MaterialModule } from "src/app/shared/material.module";
import { CategorySelectComponent } from "./category-select/category-select.component";
import { OfferTypeSelectComponent } from "./offer-type-select/offer-type-select.component";
import { ListingTimeSelectComponent } from "./listing-time-select/listing-time-select.component";
import { OffersTableComponent } from "./offers-table/offers-table.component";
import { MyOffersTableComponent } from "./my-offers-table/my-offers-table.component";

@NgModule({
  declarations: [
    ProductFilterComponent,
    ProductTableComponent,
    CategorySelectComponent,
    OfferTypeSelectComponent,
    ListingTimeSelectComponent,
    OffersTableComponent,
    MyOffersTableComponent,
  ],
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule, NgSelectModule],
  exports: [
    ProductFilterComponent,
    ProductTableComponent,
    CategorySelectComponent,
    OfferTypeSelectComponent,
    ListingTimeSelectComponent,
    OffersTableComponent,
    MyOffersTableComponent,
  ],
})
export class MainComponentsModule {}