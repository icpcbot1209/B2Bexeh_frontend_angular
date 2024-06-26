import { EventEmitter, Input, ViewChild } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IOffer } from 'src/app/interfaces/IOffer';
import { IUser } from 'src/app/interfaces/IUser';
import { ChattingService } from 'src/app/services/chatting.service';
import { ConstListService } from 'src/app/services/const-list.service';
import { OfferService } from 'src/app/services/offer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'main-my-offers-table',
  templateUrl: './my-offers-table.component.html',
  styleUrls: ['./my-offers-table.component.scss'],
})
export class MyOffersTableComponent implements OnInit {
  @Input() tag: string;

  @Input() set offers(value: IOffer[]) {
    this.updateTableRows(value);
  }

  get offers(): IOffer[] {
    return this._offers;
  }

  private _offers: IOffer[];

  @Output() offerClicked = new EventEmitter<any>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['created_at', 'other_name', 'product_name', 'unit', 'qty', 'price', 'total', 'action'];

  dataSource: MatTableDataSource<IOffer>;

  constructor(public consts: ConstListService, public offerService: OfferService, private chattingService: ChattingService, private router: Router) {}

  ngOnInit(): void {}
  updateTableRows(offers: IOffer[]) {
    if (!offers) {
      return;
    }
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

  onClickOfferStatus(offer: IOffer): void {
    this.offerClicked.emit(offer);
  }

  async onClickOtherName(offer: IOffer) {
    const chatId = await this.chattingService.startChatWith(offer.other.user_uid);
    if (chatId) {
      this.router.navigate(['/main/messages', chatId]);
    }
  }
}
