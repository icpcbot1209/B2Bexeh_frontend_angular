import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/interfaces/IProduct';
import { ProductService } from 'src/app/services/product.service';
import { SnackService } from 'src/app/services/snack.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'market-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss'],
})
export class WatchListComponent implements OnInit {
  isBusy = false;
  products: IProduct[];

  constructor(public productService: ProductService, private snack: SnackService, private userService: UserService) {}

  ngOnInit(): void {
    this.getProducts(this.productService.getWatchlist(this.userService.me.id));
  }

  async getProducts(observable: Observable<any>) {
    this.isBusy = true;
    try {
      this.products = await observable.toPromise();
      console.log(this.products);
    } catch (err) {
      console.error(err);
      this.snack.error(err.message);
    }
    this.isBusy = false;
  }
}
