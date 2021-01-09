import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { ProductService } from "src/app/services/product.service";
import { AuthService } from "src/app/shared/auth.service";

@Component({
  selector: "main-category-select",
  templateUrl: "./category-select.component.html",
  styleUrls: ["./category-select.component.scss"],
})
export class CategorySelectComponent implements OnInit {
  @Output() productsChanged = new EventEmitter<any[]>();

  constructor(public productService: ProductService, private snackbar: MatSnackBar, private authService: AuthService) {}

  ngOnInit(): void {
    this.init();
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
    this.category = category;
    this.productService.getSubcategories(category.id).subscribe((resp) => {
      this.subcategories = resp["data"]["rows"];
    });
    this.subcategory = null;
  }

  isBusy = false;
  products = [];
  onChangeSubcategory(subcategory) {
    this.subcategory = subcategory;
    this.getProducts(this.productService.getProductsByCategory(this.category.id, this.subcategory.id));
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
