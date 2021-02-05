import { Input, ViewChild } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IOffer } from 'src/app/interfaces/IOffer';

@Component({
  selector: 'main-my-offers-table',
  templateUrl: './my-offers-table.component.html',
  styleUrls: ['./my-offers-table.component.scss'],
})
export class MyOffersTableComponent implements OnInit {
  @Input() tag: string;

  private _offers: IOffer[];
  @Input() set offers(value: IOffer[]) {
    this.updateTableRows(value);
  }
  get offers(): IOffer[] {
    return this._offers;
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {}

  ngOnInit(): void {}

  displayedColumns: string[] = ['created_at', 'other_name', 'product_name', 'hope_unit', 'qty', 'price', 'total', 'order_status'];

  dataSource: MatTableDataSource<IOffer>;
  updateTableRows(offers: IOffer[]) {
    if (!offers) return;
    offers.forEach((offer) => {
      offer.total = offer.qty * offer.price;
    });
    this.dataSource = new MatTableDataSource(offers);
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
