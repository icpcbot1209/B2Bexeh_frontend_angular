import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { ComponentsStateButtonModule } from 'src/app/components/state-button/components.state-button.module';

import { HopeModalsModule } from 'src/app/views/main/hope-modals/hope-modals.module';

import { AccountComponent } from './account/account.component';
import { AlertModule } from 'ngx-bootstrap/alert';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'account' },
      { path: 'account', component: AccountComponent },
    ],
  },
];

@NgModule({
  declarations: [SettingsComponent, AccountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsStateButtonModule,
    HopeModalsModule,
    AlertModule,
  ],
})
export class SettingsModule {}
