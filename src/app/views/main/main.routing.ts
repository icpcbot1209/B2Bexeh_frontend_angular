import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'market',
        loadChildren: () => import('./pages/market/market.module').then((m) => m.MarketModule),
        data: { roles: ['admin', 'user'] },
        canActivate: [AuthGuard],
      },
      {
        path: 'product/:productId',
        loadChildren: () => import('./pages/product/product.module').then((m) => m.ProductModule),
        data: { roles: ['admin', 'user'] },
        canActivate: [AuthGuard],
      },
      {
        path: 'my-bids-asks',
        loadChildren: () => import('./pages/my-hopes/my-hopes.module').then((m) => m.MyHopesModule),
        data: { roles: ['admin', 'user'] },
        canActivate: [AuthGuard],
      },
      {
        path: 'myoffers',
        loadChildren: () => import('./pages/my-offers/my-offers.module').then((m) => m.MyOffersModule),
        data: { roles: ['admin', 'user'] },
        canActivate: [AuthGuard],
      },
      {
        path: 'messages',
        loadChildren: () => import('./pages/messages/messages.module').then((m) => m.MessagesModule),
        data: { roles: ['admin', 'user'] },
        canActivate: [AuthGuard],
      },
      { path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then((m) => m.SettingsModule) },
      { path: 'help', loadChildren: () => import('./pages/help/help.module').then((m) => m.HelpModule) },
      { path: '', pathMatch: 'full', redirectTo: 'settings' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
