import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from 'src/app/interfaces/IProduct';
@Component({
  selector: 'market-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnInit {
  @Input() set products(value: IProduct[]) {
    this.updateTableRows(value);
  }
  get products(): IProduct[] {
    return this._products;
  }

  constructor() {}
  private _products: IProduct[];

  @Output() productClicked = new EventEmitter<any>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'listingDates', 'release_date', 'boxhighestbid', 'boxlowestask'];
  dataSource: MatTableDataSource<IProduct>;

  ngOnInit(): void {}
  updateTableRows(products: IProduct[]) {
    if (!products) {
      return;
    }
    const rows: IProduct[] = [];
    products.forEach((product) => {
      const differenceInTime = new Date().getTime() - new Date(product.release_date).getTime();
      const listingDates = (differenceInTime / (1000 * 3600 * 24)).toFixed();
      const row: IProduct = { ...product, listingDates };
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

  onClickRow(row: IProduct) {
    this.productClicked.emit(row.id);
  }
}
