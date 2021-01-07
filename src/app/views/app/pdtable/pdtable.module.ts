import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MaterialModule } from "src/app/shared/material.module";
import { PrimengModule } from "src/app/shared/primneng.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PdtableComponent } from "./pdtable.component";
import { CustomerService } from "./customerservice";

@NgModule({
  declarations: [PdtableComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, PrimengModule],
  providers: [CustomerService],
  exports: [PdtableComponent],
})
export class PdtableModule {}
