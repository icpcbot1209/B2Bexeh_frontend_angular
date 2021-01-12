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
    "bidderusername",
    "product_name",
    "qty",
    "amount",
    // "amount",
    "order_status",
  ];

  dataSource: MatTableDataSource<IRow>;
  updateTableRows(offers: IRespMyOffer[]) {
    console.log(offers);
    if (!offers) return;
    let rows: IRow[] = [];
    offers.forEach((offer) => {
      let differenceInTime = new Date().getTime() - new Date(offer.expiry_date).getTime();
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
}

interface IRow {
  amount: number;
  bid_and_ask_id: string;
  bid_and_ask_type: string;
  bidder_feedback: string;
  bidder_id: string;
  bidderusername: string;
  categoryName: string;
  courier: any;
  created_at: string;
  createdbyId: any;
  delivered: any;
  expiry_date: string;
  expiry_day: string;
  id: string;
  imageUrl: string;
  is_counter_received: boolean;
  is_counter_sent: boolean;
  is_deleted: boolean;
  is_private: boolean;
  is_read: boolean;
  note: string;
  order_id: any;
  order_status: any;
  payment_date: any;
  payment_method: string;
  payment_time: string;
  paymentdetail: any;
  product_id: string;
  product_name: string;
  producttype: string;
  qty: string;
  seller_feedback: any;
  seller_id: string;
  sellerusername: string;
  shipment_date: any;
  status: any;
  total_amount: number;
  track_no: any;
  transaction_number: string;
  type: string;
  type_of: string;
  type_of_offer: string;
  listingDates: string;
}
