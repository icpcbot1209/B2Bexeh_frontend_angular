import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  @ViewChild("refTableDiv", { static: true }) refTableDiv: ElementRef;
  constructor(public productService: ProductService) {}

  ngOnInit(): void {}
  isOpenFilter = true;

  products = [];
  handleProductsChanged(products) {
    this.products = products;

    setTimeout(() => {
      // this.isOpenFilter = false;
      this.refTableDiv.nativeElement.scrollIntoView();
    }, 500);
  }
}
