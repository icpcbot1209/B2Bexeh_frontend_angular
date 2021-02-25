import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { IProduct } from 'src/app/interfaces/IProduct';
import { ProductService } from 'src/app/services/product.service';

import { IHope } from 'src/app/interfaces/IHope';
import { HopeService } from 'src/app/services/hope.service';
import { UserService } from 'src/app/services/user.service';
import { CreateOfferComponent } from '../../offer-modals/create-offer/create-offer.component';
import { IOffer } from 'src/app/interfaces/IOffer';
import { SnackService } from 'src/app/services/snack.service';
import { EditHopeComponent } from '../../hope-modals/edit-hope/edit-hope.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    public dialog: MatDialog,
    private hopeService: HopeService,
    private snack: SnackService
  ) {}

  productId;

  isBusy = false;
  product: IProduct;

  hopes: IHope[];

  asks: IHope[] = [];
  bids: IHope[] = [];
  myAsks: IHope[] = [];
  myBids: IHope[] = [];

  existInWatchlist: boolean;

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

  async loadProduct(productId) {
    this.isBusy = true;
    try {
      this.product = await this.productService.getById(productId).toPromise();
      this.existInWatchlist = await this.productService.existInWatchlist(this.userService.me.id, productId).toPromise();
    } catch (err) {
      console.error(err);
      this.snack.error(err.message);
    }
    this.isBusy = false;
  }

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
        console.error(err);
      }
    );
  }
  separateHopes(hopes: IHope[]) {
    const userId = this.userService.me.id;
    const asks: IHope[] = [];
    const bids: IHope[] = [];
    const myAsks: IHope[] = [];
    const myBids: IHope[] = [];
    hopes.forEach((hope) => {
      if (hope.is_ask) {
        asks.push(hope);
      }
      if (!hope.is_ask) {
        bids.push(hope);
      }
      if (hope.is_ask && hope.creator_id === userId) {
        myAsks.push(hope);
      }
      if (!hope.is_ask && hope.creator_id === userId) {
        myBids.push(hope);
      }
    });
    this.asks = asks;
    this.bids = bids;
    this.myAsks = myAsks;
    this.myBids = myBids;
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

  busyWatchlist = false;
  async addToWatchlist() {
    if (this.busyWatchlist) return;
    this.busyWatchlist = true;
    try {
      await this.productService.addToWatchlist(this.userService.me.id, this.productId).toPromise();
      this.existInWatchlist = true;
    } catch (err) {
      console.error(err);
      this.snack.error(err.message);
    }
    this.busyWatchlist = false;
  }

  async removeFromWatchlist() {
    if (this.busyWatchlist) return;
    this.busyWatchlist = true;
    try {
      await this.productService.removeFromWatchlist(this.userService.me.id, this.productId).toPromise();
      this.existInWatchlist = false;
    } catch (err) {
      console.error(err);
      this.snack.error(err.message);
    }
    this.busyWatchlist = false;
  }

  openCreateHopeModal(is_ask: boolean, isEditing: boolean = false, hope: IHope = null) {
    const dialogRef = this.dialog.open(EditHopeComponent, {
      data: { is_ask, product: this.product, isEditing, hope },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result: IHope) => {
      if (!result) {
        return;
      }
      if (!isEditing) {
        this.tryCreateHope(result);
      } else {
        this.tryUpdateHope(result, hope.id);
      }
    });
  }

  async tryCreateHope(hopeData: IHope) {
    try {
      const hope: IHope = await this.hopeService.createHope(hopeData).toPromise();
      hope.dealer_name = this.userService.me.user_name;

      this.hopes.push(hope);
      this.separateHopes(this.hopes);
      this.snack.success('Successfully created.');
    } catch (err) {
      console.error(err);
      this.snack.error(err.message);
    }
  }

  async tryUpdateHope(hopeData: IHope, hopeId) {
    try {
      const hope: IHope = await this.hopeService.updateHope(hopeData, hopeId).toPromise();
      hope.dealer_name = this.userService.me.user_name;

      const k = this.hopes.findIndex((x) => x.id === hope.id);
      if (k > -1) {
        this.hopes[k] = hope;
      }
      this.separateHopes(this.hopes);

      this.snack.success('Successfully updated.');
    } catch (err) {
      console.error(err);
      this.snack.error(err.message);
    }
  }

  async handleDeleteHope(hope: IHope) {
    try {
      await this.hopeService.deleteHope(hope.id).toPromise();
      this.hopes = this.hopes.filter((x) => x.id !== hope.id);
      this.separateHopes(this.hopes);

      this.snack.success('Successfully deleted.');
    } catch (err) {
      console.error(err);
      this.snack.error(err.message);
    }
  }

  handleEditHope(hope: IHope) {
    this.openCreateHopeModal(hope.is_ask, true, hope);
  }
}
