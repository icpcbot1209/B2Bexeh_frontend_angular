import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyHopesTableComponent } from './my-hopes-table/my-hopes-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MaterialModule } from 'src/app/shared/material.module';
import { MainComponentsModule } from '../main-components/main-components.module';

@NgModule({
  declarations: [MyHopesTableComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, NgSelectModule, MainComponentsModule, PerfectScrollbarModule],
  exports: [MyHopesTableComponent],
})
export class TablesModule {}
