import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MarketComponent } from "./market.component";
import { ProductsComponent } from "./products/products.component";
import { OffersComponent } from "./offers/offers.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/shared/material.module";
import { PrimengModule } from "src/app/shared/primneng.module";
import { MainComponentsModule } from "src/app/views/main/main-components/main-components.module";

const routes: Routes = [
  {
    path: "",
    component: MarketComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "products",
      },
      {
        path: "products",
        component: ProductsComponent,
      },
      {
        path: "offers",
        component: OffersComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [MarketComponent, ProductsComponent, OffersComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, MaterialModule, PrimengModule, MainComponentsModule],
})
export class MarketModule {}
