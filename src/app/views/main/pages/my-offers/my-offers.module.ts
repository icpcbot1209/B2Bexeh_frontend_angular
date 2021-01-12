import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyOffersComponent } from "./my-offers.component";
import { RouterModule, Routes } from "@angular/router";
import { MatTabsModule } from "@angular/material/tabs";

import { MyOffersTableContainerComponent } from "./my-offers-table-container/my-offers-table-container.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MainComponentsModule } from "../../main-components/main-components.module";

const routes: Routes = [
  {
    path: "",
    component: MyOffersComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "active-received" },
      { path: "active-received", component: MyOffersTableContainerComponent },
      { path: "active-sent", component: MyOffersTableContainerComponent },
      { path: "closed-received", component: MyOffersTableContainerComponent },
      { path: "closed-sent", component: MyOffersTableContainerComponent },
    ],
  },
];

@NgModule({
  declarations: [MyOffersComponent, MyOffersTableContainerComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MainComponentsModule, MatTabsModule, MatSnackBarModule],
})
export class MyOffersModule {}
