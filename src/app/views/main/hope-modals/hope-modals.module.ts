import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditHopeComponent } from './edit-hope/edit-hope.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MaterialModule } from 'src/app/shared/material.module';
import { MainComponentsModule } from '../main-components/main-components.module';

@NgModule({
  declarations: [EditHopeComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, NgSelectModule, MainComponentsModule, PerfectScrollbarModule],
  exports: [EditHopeComponent],
})
export class HopeModalsModule {}
