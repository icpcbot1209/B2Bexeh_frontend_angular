import { Component, OnInit, Inject } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { IRespOffer } from 'src/app/interfaces/IRespOffer';
import { IRespProduct } from 'src/app/interfaces/IRespProduct';
import { ProductService } from 'src/app/services/product.service';
import { OfferService } from 'src/app/services/offer.service';
import { AuthService } from 'src/app/shared/auth.service';

import { ModalCreateOfferComponent } from './modal-create-offer/modal-create-offer.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  isPerCase = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private offerService: OfferService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  productId;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async (paramMap: ParamMap) => {
      if (!paramMap.has('productId')) {
        return;
      }
      this.productId = paramMap.get('productId');
      this.loadProduct(this.productId);
      this.loadOffersByProductId(this.productId);
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

  offers: IRespOffer[];
  loadOffersByProductId(productId) {
    this.isBusy = true;
    this.offerService.getOffersByProductId(this.productId).subscribe(
      (resp) => {
        this.isBusy = false;
        this.offers = resp['data']['rows'] || resp['data'];
        this.separateOffers(this.offers, this.isPerCase);
      },
      (err) => {
        this.isBusy = false;
        console.log(err);
      }
    );
  }

  onChangeUnit(event: MatSlideToggleChange) {
    const isPerCase = event.checked;
    this.separateOffers(this.offers, isPerCase);
  }

  offersBuy: IRespOffer[] = [];
  offersSell: IRespOffer[] = [];
  offersMyBuy: IRespOffer[] = [];
  offersMySell: IRespOffer[] = [];
  separateOffers(offers: IRespOffer[], isPerCase: boolean) {
    const type = isPerCase ? 'Case' : 'Box';
    const userId = this.authService.userId;
    let offersBuy: IRespOffer[] = [];
    let offersSell: IRespOffer[] = [];
    let offersMyBuy: IRespOffer[] = [];
    let offersMySell: IRespOffer[] = [];
    offers.forEach((offer) => {
      if (offer.type !== type) return;
      if (offer.request === 'bids') offersBuy.push(offer);
      if (offer.request === 'asks') offersSell.push(offer);
      if (offer.request === 'bids' && offer.createdbyId === userId) offersMyBuy.push(offer);
      if (offer.request === 'asks' && offer.createdbyId === userId) offersMySell.push(offer);
    });
    this.offersBuy = offersBuy;
    this.offersSell = offersSell;
    this.offersMyBuy = offersMyBuy;
    this.offersMySell = offersMySell;
  }

  openCreateBid() {
    const dialogRef = this.dialog.open(ModalCreateOfferComponent, {
      data: { request: 'bid', product: this.product },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }

  openCreateAsk() {
    const dialogRef = this.dialog.open(ModalCreateOfferComponent, {
      data: { request: 'ask', product: this.product },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }

  openPriceHistory() {}

  addToWatchlist() {}
}
