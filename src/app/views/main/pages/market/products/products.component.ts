import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IRespProduct } from 'src/app/interfaces/IRespProduct';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'market-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(public productService: ProductService, private snackbar: MatSnackBar, private authService: AuthService, private router: Router) {}
  @ViewChild('refTableDiv', { static: true }) refTableDiv: ElementRef;
  isOpenFilter = true;

  products;
  isBusy = false;

  ngOnInit(): void {}

  handleCategoriesSelected({ categoryId, subcategoryId }) {
    this.getProducts(this.productService.getProductsByCategory(categoryId, subcategoryId));
  }
  getProducts(observable: Observable<any>) {
    this.isBusy = true;
    observable.subscribe(
      (resp) => {
        const products: IRespProduct[] = resp['data']['rows'] || resp['data'];
        this.products = products;
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

  handleProductClicked(productId) {
    console.log(productId);
    this.router.navigate(['/main/product', productId]);
  }
}
