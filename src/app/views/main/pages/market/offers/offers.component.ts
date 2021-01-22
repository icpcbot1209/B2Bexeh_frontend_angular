import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IRespOffer } from 'src/app/interfaces/IRespOffer';
import { OfferService } from 'src/app/services/offer.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'market-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit {
  constructor(private productService: ProductService, private offerService: OfferService, private snackbar: MatSnackBar) {}

  ngOnInit(): void {}

  categoryId;
  subcategoryId;
  type = 'All';
  listingTime = 24000;
  handleCategoriesSelected({ categoryId, subcategoryId }) {
    this.categoryId = categoryId;
    this.subcategoryId = subcategoryId;
    this.loadTableData({ categoryId, subcategoryId });
  }

  handleChangeType(type) {
    this.type = type;
    if (this.categoryId && this.subcategoryId) this.updateWithFilters();
  }
  handleChangeListing(listingTime) {
    this.listingTime = listingTime;
    if (this.categoryId && this.subcategoryId) this.updateWithFilters();
  }

  isBusy = false;
  offers: IRespOffer[];
  loadTableData({ categoryId, subcategoryId }) {
    this.isBusy = true;

    this.offerService.getLatestOffers({ categoryId, subcategoryId }).subscribe(
      (resp) => {
        this.offers = resp['data']['rows'] || resp['data'];
        this.updateWithFilters();
        this.isBusy = false;
      },
      (err) => {
        console.log(err);
        this.snackbar.open(err.message, 'close', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000,
          panelClass: ['red-snackbar'],
        });
        this.isBusy = false;
      }
    );
  }

  buyOffers: IRespOffer[] = [];
  sellOffers: IRespOffer[] = [];
  updateWithFilters() {
    this.buyOffers = [];
    this.sellOffers = [];
    this.offers.forEach((x) => {
      if (this.type !== 'All' && x.product_type !== this.type) return;
      if (this.listingTime < (Date.now() - new Date(x.release_date).getTime()) / 3600000) return;

      if (x.request === 'bids') this.buyOffers.push(x);
      else this.sellOffers.push(x);
    });
  }
}
