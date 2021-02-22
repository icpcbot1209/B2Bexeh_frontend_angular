import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { IRespProduct } from 'src/app/interfaces/IRespProduct';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'market-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss'],
})
export class WatchListComponent implements OnInit {
  constructor(public productService: ProductService, private snackbar: MatSnackBar, private userService: UserService) {}

  products: IRespProduct[];

  isBusy = false;
  ngOnInit(): void {
    this.getProducts(this.productService.getProductsWatchList(this.userService.me.user_uid));
  }

  getProducts(observable: Observable<any>) {
    this.isBusy = true;
    observable.subscribe(
      (resp) => {
        this.products = resp['data']['rows'] || resp['data'];
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
}
