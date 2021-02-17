import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IHope } from 'src/app/interfaces/IHope';
import { IRespProduct } from 'src/app/interfaces/IRespProduct';
import { ModalCreateHopeComponent } from '../../pages/product/modal-create-hope/modal-create-hope.component';
import { IOffer } from 'src/app/interfaces/IOffer';
import { OfferService } from 'src/app/services/offer.service';
import { UserService } from 'src/app/services/user.service';
import { ChattingService } from 'src/app/services/chatting.service';
import { ConfigsService } from 'src/app/services/configs.service';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss'],
})
export class CreateOfferComponent implements OnInit {
  qty: number;
  price: number;
  note: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalCreateHopeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private offerService: OfferService,
    private userService: UserService,
    private chattingService: ChattingService,
    public configs: ConfigsService
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

    if (this.data.hope.is_ask) {
      seller_id = this.data.hope.creator_id;
      buyer_id = this.userService.me.id;
    } else {
      buyer_id = this.data.hope.creator_id;
      seller_id = this.userService.me.id;
    }

    const data: IOffer = {
      hope_id: this.data.hope.id,
      product_id: this.data.product.id,
      seller_id,
      buyer_id,

      note: this.note,
      qty: this.qty,
      price: this.price,
      unit: this.data.hope.unit,
      deal_method: this.data.hope.deal_method,
    };

    try {
      const offer: IOffer = await this.offerService.createOffer(data).toPromise();
      this.dialogRef.close(offer);
    } catch (err) {
      console.log(err);
    }
  }
}

interface DialogData {
  product: IRespProduct;
  hope: IHope;
  isAccept: boolean;
}
