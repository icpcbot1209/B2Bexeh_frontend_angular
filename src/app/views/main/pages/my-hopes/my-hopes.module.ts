import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MyHopesComponent } from './my-hopes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsStateButtonModule } from 'src/app/components/state-button/components.state-button.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { HopeModalsModule } from '../../hope-modals/hope-modals.module';
import { TablesModule } from '../../tables/tables.module';

const routes: Routes = [{ path: '', component: MyHopesComponent }];

@NgModule({
  declarations: [MyHopesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsStateButtonModule,
    HopeModalsModule,
    TablesModule,
  ],
})
export class MyHopesModule {}
