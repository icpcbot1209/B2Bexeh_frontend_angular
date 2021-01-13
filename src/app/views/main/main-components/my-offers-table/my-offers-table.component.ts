import { Input, ViewChild } from "@angular/core";
import { Component, OnInit, Output } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { IRespMyOffer } from "src/app/services/IRespMyOffer";
import { MyOffersService } from "src/app/services/my-offers.service";

@Component({
  selector: "main-my-offers-table",
  templateUrl: "./my-offers-table.component.html",
  styleUrls: ["./my-offers-table.component.scss"],
})
export class MyOffersTableComponent implements OnInit {
  @Input() tag: string;

  private _offers: IRespMyOffer[];
  @Input() set offers(value: IRespMyOffer[]) {
    this.updateTableRows(value);
  }
  get offers(): IRespMyOffer[] {
    return this._offers;
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private myOffersService: MyOffersService) {}

  ngOnInit(): void {}

  displayedColumns: string[] = [
    "created_at",
    "expiry_date",
    "other_name",
    "product_name",
    "qty",
    "amount",
    "total",
    "order_status",
  ];

  dataSource: MatTableDataSource<IRow>;
  updateTableRows(offers: IRespMyOffer[]) {
    if (!offers) return;
    let rows: IRow[] = [];
    offers.forEach((offer) => {
      let differenceInTime = new Date().getTime() - new Date(offer.expiry_date).getTime();
      let listing_dates = (differenceInTime / (1000 * 3600 * 24)).toFixed();

      let total = offer.qty * offer.amount;

      let other_name = offer.bidder_name;
      if (offer.type_of == "ask") other_name = offer.seller_name;

      let row: IRow = { ...offer, listing_dates, other_name, total };
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
  id: number;
  bid_and_ask_id: number;
  seller_id: number;
  bidder_id: number;
  expiry_date: string;
  is_deleted: boolean;
  type_of: string;
  type_of_offer: string;
  payment_time: string;
  payment_method: string;
  expiry_day: number;
  product_id: number;
  note: string;
  qty: number;
  amount: number;
  total_amount: number;
  created_at: string;
  status: string;
  track_no: string;
  is_read: boolean;
  type: string;
  is_counter_sent: boolean;
  is_counter_received: boolean;
  shipment_date: string;
  payment_date: string;
  is_private: boolean;
  transaction_number: string;
  seller_name: string;
  bidder_name: string;
  product_name: string;
  listing_dates: string;
  other_name: string;
  total: number;
}
