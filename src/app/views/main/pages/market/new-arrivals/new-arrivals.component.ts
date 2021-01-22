import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { IRespProduct } from 'src/app/interfaces/IRespProduct';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'market-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.scss'],
})
export class NewArrivalsComponent implements OnInit {
  constructor(public productService: ProductService, private snackbar: MatSnackBar, private authService: AuthService) {}

  products: IRespProduct[];
  ngOnInit(): void {
    this.getProducts(this.productService.getProductsNewArrival());
  }

  isBusy = false;

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
