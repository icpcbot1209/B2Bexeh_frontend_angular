import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IRespOffer } from 'src/app/services/IRespOffer';

@Component({
  selector: 'main-product-offers-table',
  templateUrl: './product-offers-table.component.html',
  styleUrls: ['./product-offers-table.component.scss'],
})
export class ProductOffersTableComponent implements OnInit {
  private _offers: IRespOffer[];
  @Input() set offers(value: IRespOffer[]) {
    this.updateTableRows(value);
  }
  get offers(): IRespOffer[] {
    return this._offers;
  }

  @Output() productClicked = new EventEmitter<any>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {}

  ngOnInit(): void {}

  displayedColumns: string[] = ['dealer_name', 'product_type', 'qty', 'amount'];
  dataSource: MatTableDataSource<IRow>;
  updateTableRows(offers: IRespOffer[]) {
    if (!offers) return;
    let rows: IRow[] = [];
    offers.forEach((offer) => {
      let qty = `${offer.minQuantity || 0}${offer.maxQuantity ? ' - ' + offer.maxQuantity : ''}`;
      let row: IRow = { ...offer, qty };
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

  onClickRow(row: IRow) {
    this.productClicked.emit(row.id);
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
  product_type: string;
  qty: string;
}
