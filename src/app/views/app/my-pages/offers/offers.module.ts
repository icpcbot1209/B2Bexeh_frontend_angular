import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OffersComponent } from "./offers.component";
import { RouterModule, Routes } from "@angular/router";
import { ActiveReceivedComponent } from "./active-received/active-received.component";
import { ActiveSentComponent } from "./active-sent/active-sent.component";
import { ClosedSentComponent } from "./closed-sent/closed-sent.component";
import { ClosedReceivedComponent } from "./closed-received/closed-received.component";

const routes: Routes = [
  {
    path: "",
    component: OffersComponent,
  },

  { path: "active_received", loadChildren: () => import("./active-received/active-received.module").then((m) => m.ActiveReceivedModule) },
  { path: "active_sent", loadChildren: () => import("./active-sent/active-sent.module").then((m) => m.ActiveSentModule) },
  { path: "closed_received", loadChildren: () => import("./closed-received/closed-received.module").then((m) => m.ClosedReceivedModule) },
  { path: "closed_sent", loadChildren: () => import("./closed-sent/closed-sent.module").then((m) => m.ClosedSentModule) },
];

@NgModule({
  declarations: [OffersComponent, ActiveReceivedComponent, ActiveSentComponent, ClosedSentComponent, ClosedReceivedComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OffersModule {}
