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

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['photo_url', 'name', 'release_date', 'boxhighestbid', 'boxlowestask'];
  dataSource: MatTableDataSource<IProduct>;

  ngOnInit(): void {}
  updateTableRows(products: IProduct[]) {
    if (!products) {
      return;
    }

    this.dataSource = new MatTableDataSource(products);
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
