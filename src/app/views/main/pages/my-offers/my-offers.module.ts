import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyOffersComponent } from "./my-offers.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [{ path: "", component: MyOffersComponent }];

@NgModule({
  declarations: [MyOffersComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class MyOffersModule {}
