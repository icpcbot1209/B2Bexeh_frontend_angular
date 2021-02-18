import { Component, OnInit, Inject } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { IRespProduct } from 'src/app/interfaces/IRespProduct';
import { ProductService } from 'src/app/services/product.service';
import { OfferService } from 'src/app/services/offer.service';
import { AuthService } from 'src/app/shared/auth.service';

import { ChattingService } from 'src/app/services/chatting.service';

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
    private offerService: OfferService,
    private authService: AuthService,
    private userService: UserService,
    private chattingService: ChattingService,
    public dialog: MatDialog,
    private hopeService: HopeService,
    private snack: SnackService
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
        this.product = resp;
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

  openCreateHopeModal(is_ask: boolean, isEditing: boolean = false, hope: IHope = null) {
    const dialogRef = this.dialog.open(EditHopeComponent, {
      data: { is_ask, product: this.product, isEditing, hope },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result: IHope) => {
      if (!result) return;
      if (!isEditing) this.tryCreateHope(result);
      else this.tryUpdateHope(result, hope.id);
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
      console.log(err);
      this.snack.error(err.message);
    }
  }

  async tryUpdateHope(hopeData: IHope, hopeId) {
    try {
      const hope: IHope = await this.hopeService.updateHope(hopeData, hopeId).toPromise();
      hope.dealer_name = this.userService.me.user_name;

      let k = this.hopes.findIndex((x) => x.id === hope.id);
      if (k > -1) this.hopes[k] = hope;
      this.separateHopes(this.hopes);

      this.snack.success('Successfully updated.');
    } catch (err) {
      console.log(err);
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
      console.log(err);
      this.snack.error(err.message);
    }
  }

  handleEditHope(hope: IHope) {
    this.openCreateHopeModal(hope.is_ask, true, hope);
  }
}
