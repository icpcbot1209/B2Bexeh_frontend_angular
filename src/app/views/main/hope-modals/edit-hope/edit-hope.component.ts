import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IRespProduct } from 'src/app/interfaces/IRespProduct';
import { IHope } from 'src/app/interfaces/IHope';

@Component({
  templateUrl: './edit-hope.component.html',
  styleUrls: ['./edit-hope.component.scss'],
})
export class EditHopeComponent implements OnInit {
  deal_method = '';
  unit: string = 'Box';
  qty: number = 1;
  price: number;
  note: string = '';

  constructor(public dialogRef: MatDialogRef<EditHopeComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    if (data.isEditing) {
      this.deal_method = data.hope.deal_method;
      this.unit = data.hope.unit;
      this.qty = data.hope.qty;
      this.price = data.hope.price;
      this.note = data.hope.note;
    } else {
      this.resetPrice();
    }
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

  onSubmit() {
    const hopeData: IHope = {
      is_ask: this.data.is_ask,
      note: this.note,
      product_id: this.data.product.id,
      qty: this.qty,
      price: this.price,
      unit: this.unit,
      deal_method: this.deal_method,
    };
    this.dialogRef.close(hopeData);
  }
}

interface DialogData {
  is_ask: boolean;
  product: IRespProduct;
  isEditing: boolean;
  hope: IHope;
}
