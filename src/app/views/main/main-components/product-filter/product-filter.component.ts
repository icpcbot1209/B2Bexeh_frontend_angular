import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { ProductService } from "src/app/services/product.service";
import { AuthService } from "src/app/shared/auth.service";

@Component({
  selector: "main-product-filter",
  templateUrl: "./product-filter.component.html",
  styleUrls: ["./product-filter.component.scss"],
})
export class ProductFilterComponent implements OnInit {
  @Input() isOpen: boolean;
  @Output() productsChanged = new EventEmitter<any[]>();

  constructor(public productService: ProductService, private snackbar: MatSnackBar, private authService: AuthService) {}

  ngOnInit(): void {
    this.init();
  }

  filters: Filter[] = [
    {
      uid: "0",
      title: "Categories",
    },
    {
      uid: "1",
      title: "Popular",
      icon: "iconsminds-business-mens",
      description: "Items that have the most buy/sell offers",
    },
    {
      uid: "2",
      title: "New Arrivals",
      icon: "iconsminds-add-bag",
      description: "Items that have just been released",
    },
    {
      uid: "3",
      title: "Watch List",
      icon: "iconsminds-receipt-4",
      description: "Items that i've hearted",
    },
  ];
  theFilter: Filter;
  setFilter(filter: Filter) {
    if (this.theFilter === filter) return;
    this.theFilter = filter;

    this.category = null;
    this.subcategory = null;

    if (filter.uid === "1") {
      // popular
      this.getProducts(this.productService.getProductsPopular());
    } else if (filter.uid === "2") {
      // new arrivals
      this.getProducts(this.productService.getProductsNewArrival());
    } else if (filter.uid === "3") {
      // watch list
      console.log(this.authService.userId);
      this.getProducts(this.productService.getProductsWatchList(this.authService.userId));
    }
  }

  categories = [];
  init() {
    this.productService.getCategories().subscribe((resp) => {
      this.categories = resp["data"]["rows"];
    });
  }

  subcategories = [];
  category;
  subcategory;
  onChangeCategory(category) {
    this.productService.getSubcategories(category.id).subscribe((resp) => {
      this.subcategories = resp["data"]["rows"];
    });
    this.subcategory = null;
  }

  isBusy = false;
  products = [];
  onChangeSubcategory(subcategory) {
    this.getProducts(this.productService.getProductsByCategory(this.category.id, subcategory.id));
  }

  getProducts(observable: Observable<any>) {
    this.isBusy = true;
    observable.subscribe(
      (resp) => {
        this.products = resp["data"]["rows"] || resp["data"];
        this.productsChanged.emit(this.products);
        this.isBusy = false;
      },
      (err) => {
        console.log(err);
        this.snackbar.open(err.message, "close", { horizontalPosition: "end", verticalPosition: "top", duration: 5000, panelClass: ["red-snackbar"] });
        this.isBusy = false;
      }
    );
  }
}

interface Filter {
  uid: string;
  title: string;
  description?: string;
  icon?: string;
  sports?: string;
  year?: string;
}
