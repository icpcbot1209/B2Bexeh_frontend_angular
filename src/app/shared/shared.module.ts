import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
@NgModule({
  declarations: [],
  imports: [RouterModule, CommonModule, TranslateModule, PerfectScrollbarModule],
  exports: [PerfectScrollbarModule, RouterModule, TranslateModule, CommonModule],
})
export class SharedModule {}
