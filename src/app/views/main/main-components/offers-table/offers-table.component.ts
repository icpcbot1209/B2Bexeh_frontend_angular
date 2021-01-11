import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { IRespOffer } from "src/app/services/IRespOffer";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "main-offers-table",
  templateUrl: "./offers-table.component.html",
  styleUrls: ["./offers-table.component.scss"],
})
export class OffersTableComponent implements OnInit {
  private _offers: IRespOffer[];
  @Input() set offers(value: IRespOffer[]) {
    this.updateTableRows(value);
  }
  get offers(): IRespOffer[] {
    return this._offers;
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  displayedColumns: string[] = ["user_name", "productName", "producttype", "categoryName", "amount", "type"];

  dataSource: MatTableDataSource<IRow>;
  updateTableRows(offers: IRespOffer[]) {
    if (!offers) return;
    let rows: IRow[] = [];
    offers.forEach((offer) => {
      let differenceInTime = new Date().getTime() - new Date(offer.releaseDate).getTime();
      let listingDates = (differenceInTime / (1000 * 3600 * 24)).toFixed();

      let categoryName = this.productService.sportId2Name(offer.categoryId);
      let row: IRow = { ...offer, listingDates, categoryName };
      rows.push(row);
    });
    this.dataSource = new MatTableDataSource(rows);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

interface IRow {
  additional_term: string;
  amount: number;
  categoryId: string;
  company_logo: string;
  createdAt: string;
  createdbyId: string;
  first_name: string;
  id: string;
  imageUrl: string;
  isPrivate: boolean;
  isactive: boolean;
  isaddtocart: boolean;
  isdeleted: boolean;
  last_name: string;
  listingTime: string;
  maxQuantity: number;
  minQuantity: number;
  note: string;
  payment_mode: string;
  payment_timing: string;
  productId: string;
  productName: string;
  producttype: string;
  profile_image_url: string;
  quantity: number;
  releaseDate: string;
  request: string;
  subcategoryId: string;
  subtype: string;
  term_shipping: string;
  type: string;
  uid: string;
  updatedAt: string;
  updatedbyId: string;
  user_name: string;
  listingDates: string;
  categoryName: string;
}
