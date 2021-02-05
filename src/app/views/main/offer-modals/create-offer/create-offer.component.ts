import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IHope } from 'src/app/interfaces/IHope';
import { IRespProduct } from 'src/app/interfaces/IRespProduct';
import { ModalCreateHopeComponent } from '../../pages/product/modal-create-hope/modal-create-hope.component';
import { payment_methods, payment_timings } from 'src/app/constants/main';
import { IOffer } from 'src/app/interfaces/IOffer';
import { OfferService } from 'src/app/services/offer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss'],
})
export class CreateOfferComponent implements OnInit {
  payment_methods = payment_methods;
  payment_timings = payment_timings;

  qty: number;
  price: number;
  payment_method: number;
  payment_timing: number;
  note: string;

  constructor(
    public dialogRef: MatDialogRef<ModalCreateHopeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private offerService: OfferService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.qty = this.data.hope.qty;
    this.price = this.data.hope.price;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onClickCreate() {
    let seller_id, buyer_id;

    if (!this.data.hope.is_ask) {
      seller_id = Number(this.data.hope.creator_id);
      buyer_id = Number(this.userService.me.id);
    } else {
      buyer_id = Number(this.data.hope.creator_id);
      seller_id = Number(this.userService.me.id);
    }

    const data: IOffer = {
      note: this.note,
      qty: this.qty,
      price: this.price,
      payment_method: this.payment_method,
      payment_timing: this.payment_timing,
      hope_id: this.data.hope.id,
      product_id: this.data.product.id,
      seller_id,
      buyer_id,
    };

    try {
      const offer = await this.offerService.createOffer(data).toPromise();
      this.dialogRef.close(offer);
    } catch (err) {
      console.log(err);
    }
  }
}

interface DialogData {
  product: IRespProduct;
  hope: IHope;
}
