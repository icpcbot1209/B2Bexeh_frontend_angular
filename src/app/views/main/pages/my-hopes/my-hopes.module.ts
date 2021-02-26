import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MyHopesComponent } from './my-hopes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsStateButtonModule } from 'src/app/components/state-button/components.state-button.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { HopeModalsModule } from '../../hope-modals/hope-modals.module';
import { MyHopesTableComponent } from './my-hopes-table/my-hopes-table.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MainComponentsModule } from '../../main-components/main-components.module';

const routes: Routes = [{ path: '', component: MyHopesComponent }];

@NgModule({
  declarations: [MyHopesComponent, MyHopesTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsStateButtonModule,
    HopeModalsModule,
    NgSelectModule,
    MainComponentsModule,
    PerfectScrollbarModule,
  ],
})
export class MyHopesModule {}
