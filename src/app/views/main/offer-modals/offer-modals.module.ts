import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { NgSelectModule } from '@ng-select/ng-select';

import { SentPendingComponent } from './sent-pending/sent-pending.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, NgSelectModule],
  declarations: [SentPendingComponent],
  exports: [],
})
export class OfferModalsModule {}
