import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { SnackService } from 'src/app/services/snack.service';

@Component({
  selector: 'market-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(public productService: ProductService, private router: Router, private snack: SnackService) {}
  @ViewChild('refTableDiv', { static: true }) refTableDiv: ElementRef;
  isOpenFilter = true;

  products;
  isBusy = false;

  ngOnInit(): void {}

  handleCategoriesSelected({ categoryId, subcategoryId }) {
    this.getProducts(this.productService.getProductsByCategory(categoryId, subcategoryId));
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

  handleProductClicked(productId) {
    console.log(productId);
    this.router.navigate(['/main/product', productId]);
  }
}
