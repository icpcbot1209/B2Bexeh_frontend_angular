import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { IRespProduct } from "src/app/services/IRespProduct";
@Component({
  selector: "main-product-table",
  templateUrl: "./product-table.component.html",
  styleUrls: ["./product-table.component.scss"],
})
export class ProductTableComponent implements OnInit {
  private _products: IRespProduct[];
  @Input() set products(value: IRespProduct[]) {
    this.updateTableRows(value);
  }
  get products(): IRespProduct[] {
    return this._products;
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {}

  ngOnInit(): void {}

  displayedColumns: string[] = ["productName", "listingDates", "releaseDate", "boxhighestbid", "boxlowestask"];
  dataSource: MatTableDataSource<IRow>;
  updateTableRows(products: IRespProduct[]) {
    if (!products) return;
    let rows: IRow[] = [];
    products.forEach((product) => {
      let differenceInTime = new Date().getTime() - new Date(product.releaseDate).getTime();
      let listingDates = (differenceInTime / (1000 * 3600 * 24)).toFixed();
      let row: IRow = { ...product, listingDates: listingDates };
      rows.push(row);
    });

    this.dataSource = new MatTableDataSource(rows);
    this.dataSource.sort = this.sort;
    console.log(this.sort);
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
  category_id: string;
  subcategoryId: string;
  product_id: string;
  producr_id: string;
  releaseDate: Date;
  productName: string;
  createdAt: Date;
  updatedAt: Date;
  isdeleted: boolean;
  createdById: any;
  updatedById: any;
  boxhighestbid: number;
  boxlowestask: number;
  casehighestbid: number;
  caselowestask: number;
  id: string;
  imageUrl: string;
  isActivate: boolean;
  is_featured: boolean;
  listingDates: any;
}
