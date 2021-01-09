import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductFilterComponent } from "./product-filter/product-filter.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { ProductTableComponent } from "./product-table/product-table.component";
import { BootstrapModule } from "src/app/components/bootstrap/bootstrap.module";
import { MaterialModule } from "src/app/shared/material.module";
import { CategorySelectComponent } from "./category-select/category-select.component";

@NgModule({
  declarations: [ProductFilterComponent, ProductTableComponent, CategorySelectComponent],
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule, NgSelectModule],
  exports: [ProductFilterComponent, ProductTableComponent, CategorySelectComponent],
})
export class MainComponentsModule {}
