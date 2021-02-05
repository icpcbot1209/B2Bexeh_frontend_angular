import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketComponent } from './market.component';
import { ProductsComponent } from './products/products.component';
import { HopesComponent } from './hopes/hopes.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { PrimengModule } from 'src/app/shared/primneng.module';
import { MainComponentsModule } from 'src/app/views/main/main-components/main-components.module';
import { PopularComponent } from './popular/popular.component';
import { NewArrivalsComponent } from './new-arrivals/new-arrivals.component';
import { WatchListComponent } from './watch-list/watch-list.component';

import { ProductTableComponent } from './products/product-table/product-table.component';
import { HopesTableComponent } from './hopes/hopes-table/hopes-table.component';

const routes: Routes = [
  {
    path: '',
    component: MarketComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'products',
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'popular',
        component: PopularComponent,
      },
      {
        path: 'new-arrivals',
        component: NewArrivalsComponent,
      },
      {
        path: 'watch-list',
        component: WatchListComponent,
      },
      {
        path: 'bidsasks',
        component: HopesComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    MarketComponent,
    ProductsComponent,
    HopesComponent,
    PopularComponent,
    NewArrivalsComponent,
    WatchListComponent,

    ProductTableComponent,
    HopesTableComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, MaterialModule, PrimengModule, MainComponentsModule],
})
export class MarketModule {}
