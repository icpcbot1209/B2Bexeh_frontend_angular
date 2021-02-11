import { Component, OnInit, Inject } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { IRespProduct } from 'src/app/interfaces/IRespProduct';
import { ProductService } from 'src/app/services/product.service';
import { OfferService } from 'src/app/services/offer.service';
import { AuthService } from 'src/app/shared/auth.service';

import { ModalCreateHopeComponent } from './modal-create-hope/modal-create-hope.component';
import { ChattingService } from 'src/app/services/chatting.service';

import { IHope } from 'src/app/interfaces/IHope';
import { HopeService } from 'src/app/services/hope.service';
import { UserService } from 'src/app/services/user.service';
import { CreateOfferComponent } from '../../offer-modals/create-offer/create-offer.component';
import { IOffer } from 'src/app/interfaces/IOffer';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private offerService: OfferService,
    private authService: AuthService,
    private userService: UserService,
    private chattingService: ChattingService,
    public dialog: MatDialog,
    private hopeService: HopeService,
    private router: Router
  ) {}

  productId;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async (paramMap: ParamMap) => {
      if (!paramMap.has('productId')) {
        return;
      }
      this.productId = paramMap.get('productId');
      this.loadProduct(this.productId);
      this.readHopesByProductId(this.productId);
    });
  }

  isBusy = false;
  product: IRespProduct;
  loadProduct(productId) {
    this.isBusy = true;
    this.productService.getProductById(productId).subscribe(
      (resp) => {
        this.isBusy = false;
        let arr: any[] = resp['data']['rows'] || resp['data'];
        if (arr && arr.length > 0) this.product = arr[0];
      },
      (err) => {
        this.isBusy = false;
        console.log(err);
      }
    );
  }

  hopes: IHope[];
  readHopesByProductId(productId) {
    this.isBusy = true;
    this.hopeService.readByProductId(this.productId).subscribe(
      (resp) => {
        this.isBusy = false;
        this.hopes = resp;
        this.separateHopes(this.hopes);
      },
      (err) => {
        this.isBusy = false;
        console.log(err);
      }
    );
  }

  asks: IHope[] = [];
  bids: IHope[] = [];
  myAsks: IHope[] = [];
  myBids: IHope[] = [];
  separateHopes(hopes: IHope[]) {
    const userId = this.authService.userId;
    let asks: IHope[] = [];
    let bids: IHope[] = [];
    let myAsks: IHope[] = [];
    let myBids: IHope[] = [];
    hopes.forEach((hope) => {
      if (hope.is_ask) asks.push(hope);
      if (!hope.is_ask) bids.push(hope);
      if (hope.is_ask && hope.creator_id === userId) myAsks.push(hope);
      if (!hope.is_ask && hope.creator_id === userId) myBids.push(hope);
    });
    this.asks = asks;
    this.bids = bids;
    this.myAsks = myAsks;
    this.myBids = myBids;
  }

  openCreateHopeModal(is_ask) {
    const dialogRef = this.dialog.open(ModalCreateHopeComponent, {
      data: { is_ask, product: this.product },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result: IHope) => {
      if (result) this.tryCreateHope(result);
    });
  }

  async tryCreateHope(hopeData: IHope) {
    try {
      const hope: IHope = await this.hopeService.createHope(hopeData).toPromise();
      hope.dealer_name = this.userService.me.user_name;

      this.hopes.push(hope);
      this.separateHopes(this.hopes);
    } catch (err) {
      console.log(err);
    }
  }

  openCreateOfferModal({ hope, isAccept }) {
    const dialogRef = this.dialog.open(CreateOfferComponent, {
      data: { isAccept, hope, product: this.product },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result: IOffer) => {
      if (result) {
      }
    });
  }

  openPriceHistory() {}

  addToWatchlist() {}

  handleDeleteHope(hope: IHope) {
    // TODO: api
    this.hopes = this.hopes.filter((x) => x.id !== hope.id);
    console.log(this.hopes.length);
    this.separateHopes(this.hopes);
  }

  handleSaveHope(hope: IHope) {
    // TODO: api
    let k = this.hopes.findIndex((x) => x.id === hope.id);
    if (k > -1) this.hopes[k] = hope;
  }
}
