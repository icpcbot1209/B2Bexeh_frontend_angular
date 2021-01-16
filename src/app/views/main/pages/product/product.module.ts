import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductComponent } from "./product.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/shared/material.module";
import { MainComponentsModule } from "src/app/views/main/main-components/main-components.module";

const routes: Routes = [{ path: "", component: ProductComponent }];

@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule, MaterialModule, MainComponentsModule],
})
export class ProductModule {}
