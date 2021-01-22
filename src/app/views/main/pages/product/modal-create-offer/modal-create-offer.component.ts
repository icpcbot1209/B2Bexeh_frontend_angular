import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IRespProduct } from 'src/app/interfaces/IRespProduct';
import { productTypes } from 'src/app/constants/product_type';

@Component({
  selector: 'main-modal-create-offer',
  templateUrl: './modal-create-offer.component.html',
  styleUrls: ['./modal-create-offer.component.scss'],
})
export class ModalCreateOfferComponent implements OnInit {
  productTypes = productTypes;
  productType = productTypes[0];
  unit: string = 'Box';
  qty: number = 1;
  price: number;
  text: string;

  constructor(public dialogRef: MatDialogRef<ModalCreateOfferComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.resetPrice();
  }

  ngOnInit(): void {}

  unitWillChange(unit) {
    this.resetPrice();
  }

  resetPrice() {
    if (this.unit === 'Box' && this.data.request === 'bid') this.price = this.data.product.boxhighestbid;
    if (this.unit === 'Box' && this.data.request === 'ask') this.price = this.data.product.boxlowestask;
    if (this.unit === 'Case' && this.data.request === 'bid') this.price = this.data.product.casehighestbid;
    if (this.unit === 'Case' && this.data.request === 'ask') this.price = this.data.product.caselowestask;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClickCreate() {
    this.dialogRef.close({ productType: this.productType.id, unit: this.unit, qty: this.qty, price: this.price, text: this.text });
  }
}

interface DialogData {
  request: string;
  product: IRespProduct;
}
