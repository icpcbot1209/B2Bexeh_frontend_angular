import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from 'src/app/shared/material.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MyOffersComponent } from './my-offers.component';
import { MyOffersTableContainerComponent } from './my-offers-table-container/my-offers-table-container.component';
import { MyOffersTableComponent } from './my-offers-table/my-offers-table.component';
import { OfferModalsModule } from '../../offer-modals/offer-modals.module';

const routes: Routes = [
  {
    path: '',
    component: MyOffersComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'active-received' },
      { path: 'active-received', component: MyOffersTableContainerComponent },
      { path: 'active-sent', component: MyOffersTableContainerComponent },
      { path: 'closed-received', component: MyOffersTableContainerComponent },
      { path: 'closed-sent', component: MyOffersTableContainerComponent },
    ],
  },
];

@NgModule({
  declarations: [MyOffersComponent, MyOffersTableContainerComponent, MyOffersTableComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule, OfferModalsModule],
})
export class MyOffersModule {}
