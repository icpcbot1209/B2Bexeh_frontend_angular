import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IRespProduct } from 'src/app/interfaces/IRespProduct';
import { deal_methods } from 'src/app/interfaces/IHope';
import { IHope } from 'src/app/interfaces/IHope';

@Component({
  selector: 'main-modal-create-hope',
  templateUrl: './modal-create-hope.component.html',
  styleUrls: ['./modal-create-hope.component.scss'],
})
export class ModalCreateHopeComponent implements OnInit {
  deal_methods = deal_methods;
  deal_method = deal_methods[0];
  unit: string = 'Box';
  qty: number = 1;
  price: number;
  note: string;

  constructor(public dialogRef: MatDialogRef<ModalCreateHopeComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.resetPrice();
  }

  ngOnInit(): void {}

  unitWillChange(unit) {
    this.resetPrice();
  }

  resetPrice() {
    if (this.unit === 'Box' && !this.data.is_ask) this.price = this.data.product.boxhighestbid;
    if (this.unit === 'Box' && this.data.is_ask) this.price = this.data.product.boxlowestask;
    if (this.unit === 'Case' && !this.data.is_ask) this.price = this.data.product.casehighestbid;
    if (this.unit === 'Case' && this.data.is_ask) this.price = this.data.product.caselowestask;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClickCreate() {
    const hopeData: IHope = {
      is_ask: this.data.is_ask,
      note: this.note,
      product_id: this.data.product.id,
      qty: this.qty,
      price: this.price,
      unit: this.unit,
      deal_method: this.deal_method.id,
    };
    this.dialogRef.close(hopeData);
  }
}

interface DialogData {
  is_ask: boolean;
  product: IRespProduct;
}
