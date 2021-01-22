import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { IRespOffer } from 'src/app/interfaces/IRespOffer';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'main-offers-table',
  templateUrl: './offers-table.component.html',
  styleUrls: ['./offers-table.component.scss'],
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

  test(e) {
    console.log(e);
  }

  displayedColumns: string[] = ['select', 'dealer_name', 'product_name', 'product_type', 'sport_name', 'amount', 'type'];

  dataSource: MatTableDataSource<IRow>;
  updateTableRows(offers: IRespOffer[]) {
    if (!offers) return;
    let rows: IRow[] = [];
    offers.forEach((offer) => {
      let differenceInTime = new Date().getTime() - new Date(offer.release_date).getTime();
      let listingDates = (differenceInTime / (1000 * 3600 * 24)).toFixed();

      let row: IRow = { ...offer, listingDates };
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

  selection = new SelectionModel<IRow>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  onClickRow(row: IRow) {
    console.log(row);
  }
}

interface IRow {
  id: number;
  productId: number;
  producttype: string;
  amount: number;
  isdeleted: boolean;
  createdAt: string;
  createdbyId: string;
  updatedAt: string;
  updatedbyId: number;
  request: string;
  type: string;
  note: string;
  maxQuantity: number;
  minQuantity: number;
  subtype: string;
  isactive: boolean;
  isaddtocart: boolean;
  isPrivate: boolean;
  dealer_name: string;
  product_name: string;
  product_type: string;
  sport_name: string;
  release_date: string;
  listingDates: string;
}
