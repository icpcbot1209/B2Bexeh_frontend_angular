import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

const arr = [
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatIconModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatTabsModule,
  MatExpansionModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSlideToggleModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...arr],
  exports: [...arr],
})
export class MaterialModule {}
