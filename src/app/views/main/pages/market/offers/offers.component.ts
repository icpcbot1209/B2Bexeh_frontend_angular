import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "market-offers",
  templateUrl: "./offers.component.html",
  styleUrls: ["./offers.component.scss"],
})
export class OffersComponent implements OnInit {
  constructor(private productService: ProductService, private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadTableData();
  }

  handleCategoriesSelected({ categoryId, subcategoryId }) {}
  handleChangeType(event) {}
  handleChangeListing(event) {}

  offers;
  isBusy = false;
  loadTableData() {
    this.isBusy = true;
    this.productService.getLatestOffers(true).subscribe(
      (resp) => {
        this.offers = resp["data"]["rows"] || resp["data"];

        this.isBusy = false;
      },
      (err) => {
        console.log(err);
        this.snackbar.open(err.message, "close", {
          horizontalPosition: "end",
          verticalPosition: "top",
          duration: 5000,
          panelClass: ["red-snackbar"],
        });
        this.isBusy = false;
      }
    );
  }
}
