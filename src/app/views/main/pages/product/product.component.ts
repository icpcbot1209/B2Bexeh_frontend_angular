import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IRespOffer } from 'src/app/services/IRespOffer';
import { ProductService } from 'src/app/services/product.service';
import { OfferService } from 'src/app/services/offer.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  isPerCase = false;
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private offerService: OfferService, private authService: AuthService) {}

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
  product: IProductRecp;
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
}

interface IProductRecp {
  boxhighestbid: number;
  boxlowestask: number;
  casehighestbid: number;
  caselowestask: number;
  categoryId: string;
  categoryName: string;
  createdAt: string;
  createdById: string;
  id: string;
  imageUrl: string;
  isActivate: boolean;
  is_featured: boolean;
  isdeleted: boolean;
  productName: string;
  product_id: string;
  releaseDate: string;
  subcategoryId: string;
  updatedAt: string;
  updatedById: any;
}
