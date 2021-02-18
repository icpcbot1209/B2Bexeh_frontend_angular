import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { ComponentsStateButtonModule } from 'src/app/components/state-button/components.state-button.module';

import { AccountComponent } from './account/account.component';
import { BidsAsksComponent } from './bids-asks/bids-asks.component';
import { BillingComponent } from './billing/billing.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'account' },
      { path: 'account', component: AccountComponent },
      { path: 'bids-asks', component: BidsAsksComponent },
      { path: 'billing', component: BillingComponent },
    ],
  },
];

@NgModule({
  declarations: [SettingsComponent, AccountComponent, BidsAsksComponent, BillingComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule, MaterialModule, ComponentsStateButtonModule],
})
export class SettingsModule {}
