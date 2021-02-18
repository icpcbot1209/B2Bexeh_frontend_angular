import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'market' },
      { path: 'market', loadChildren: () => import('./pages/market/market.module').then((m) => m.MarketModule) },
      { path: 'myoffers', loadChildren: () => import('./pages/my-offers/my-offers.module').then((m) => m.MyOffersModule) },
      { path: 'messages', loadChildren: () => import('./pages/messages/messages.module').then((m) => m.MessagesModule) },
      { path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then((m) => m.SettingsModule) },
      { path: 'help', loadChildren: () => import('./pages/help/help.module').then((m) => m.HelpModule) },
      { path: 'product/:productId', loadChildren: () => import('./pages/product/product.module').then((m) => m.ProductModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
