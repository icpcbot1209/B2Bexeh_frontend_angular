import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "market-offers",
  templateUrl: "./offers.component.html",
  styleUrls: ["./offers.component.scss"],
})
export class OffersComponent implements OnInit {
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadTableData();
  }

  handleCategoriesSelected({ categoryId, subcategoryId }) {}
  handleChangeType(event) {}
  handleChangeListing(event) {}

  offers;
  loadTableData() {
    this.productService.getLatestOffers(true).subscribe((resp) => {
      this.offers = resp["data"]["rows"] || resp["data"];
    });
  }
}
