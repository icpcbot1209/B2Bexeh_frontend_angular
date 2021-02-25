import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProduct } from 'src/app/interfaces/IProduct';
import { IHope } from 'src/app/interfaces/IHope';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { genralConfig } from 'src/app/constants/genral-config.constant';
import { ConstListService } from 'src/app/services/const-list.service';

@Component({
  templateUrl: './edit-hope.component.html',
  styleUrls: ['./edit-hope.component.scss'],
})
export class EditHopeComponent implements OnInit {
  theForm: FormGroup;
  units = [];
  deal_methods = [];
  constructor(
    public dialogRef: MatDialogRef<EditHopeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private userService: UserService,
    public consts: ConstListService
  ) {
    this.units = this.consts.dict_unit.slice(1);
    this.deal_methods = this.consts.dict_deal_method.slice(1);
  }

  ngOnInit(): void {
    this.theForm = this.formBuilder.group({
      unit: new FormControl(null, [Validators.required]),
      deal_method: new FormControl(null, [Validators.required]),
      qty: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      note: new FormControl(null, [Validators.required]),
    });

    if (this.data.isEditing) {
      this.theForm.setValue({
        unit: this.data.hope.unit,
        deal_method: this.data.hope.deal_method,
        qty: this.data.hope.qty,
        price: this.data.hope.price,
        note: this.data.hope.note,
      });
    } else {
      // this.resetPrice();
    }
  }

  unitWillChange(unit) {
    // this.resetPrice();
  }

  resetPrice() {
    let unit = this.theForm.value.unit;
    let price = 0;
    if (unit === 'box' && !this.data.is_ask) {
      price = this.data.product.boxhighestbid;
    }
    if (unit === 'box' && this.data.is_ask) {
      price = this.data.product.boxlowestask;
    }
    if (unit === 'case' && !this.data.is_ask) {
      price = this.data.product.casehighestbid;
    }
    if (unit === 'case' && this.data.is_ask) {
      price = this.data.product.caselowestask;
    }

    this.theForm.value.price = price;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.theForm.invalid) return;

    const value = this.theForm.value;
    const hopeData: IHope = {
      creator_id: this.userService.me.id,
      is_ask: this.data.is_ask,
      product_id: this.data.product.id,
      ...value,
    };
    this.dialogRef.close(hopeData);
  }
}

interface DialogData {
  is_ask: boolean;
  product: IProduct;
  isEditing: boolean;
  hope: IHope;
}
