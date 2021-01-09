import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./main.component";

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "market" },
      { path: "market", loadChildren: () => import("./pages/market/market.module").then((m) => m.MarketModule) },
      { path: "myoffers", loadChildren: () => import("./pages/my-offers/my-offers.module").then((m) => m.MyOffersModule) },
      { path: "message", loadChildren: () => import("./pages/messages/messages.module").then((m) => m.MessagesModule) },
      { path: "help", loadChildren: () => import("./pages/help/help.module").then((m) => m.HelpModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
