import { Component, OnInit } from '@angular/core';
import { IHope } from 'src/app/interfaces/IHope';
import { IRespOffer } from 'src/app/interfaces/IRespOffer';
import { HopeService } from 'src/app/services/hope.service';
import { SnackService } from 'src/app/services/snack.service';

@Component({
  selector: 'market-hopes',
  templateUrl: './hopes.component.html',
  styleUrls: ['./hopes.component.scss'],
})
export class HopesComponent implements OnInit {
  constructor(private hopeService: HopeService, private snack: SnackService) {}

  categoryId;
  subcategoryId;
  type = '';
  listingTime = 24000;

  isBusy = false;
  hopes: IHope[] = [];

  bids: IHope[] = [];
  asks: IHope[] = [];

  ngOnInit(): void {}
  handleCategoriesSelected({ categoryId, subcategoryId }) {
    this.categoryId = categoryId;
    this.subcategoryId = subcategoryId;
    this.loadTableData({ categoryId, subcategoryId });
  }

  handleChangeType(type) {
    this.type = type;
    if (this.categoryId && this.subcategoryId) {
      this.updateWithFilters();
    }
  }
  handleChangeListing(listingTime) {
    this.listingTime = listingTime;
    if (this.categoryId && this.subcategoryId) {
      this.updateWithFilters();
    }
  }
  loadTableData({ categoryId, subcategoryId }) {
    this.isBusy = true;

    this.hopeService.getByCategory(categoryId, subcategoryId).subscribe(
      (resp) => {
        this.hopes = resp;
        this.updateWithFilters();
        this.isBusy = false;
      },
      (err) => {
        console.error(err);
        this.snack.error(err.message);
        this.isBusy = false;
      }
    );
  }
  updateWithFilters() {
    this.asks = [];
    this.bids = [];

    this.hopes.forEach((x) => {
      if (this.type !== 'all' && x.deal_method !== this.type) {
        return;
      }
      if (this.listingTime < (Date.now() - new Date(x.release_date).getTime()) / 3600000) {
        return;
      }

      if (x.is_ask) {
        this.asks.push(x);
      } else {
        this.bids.push(x);
      }
    });
  }
}
