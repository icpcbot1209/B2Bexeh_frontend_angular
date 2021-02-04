import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IHope } from 'src/app/interfaces/IHope';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'main-hopes-table',
  templateUrl: './hopes-table.component.html',
  styleUrls: ['./hopes-table.component.scss'],
})
export class HopesTableComponent implements OnChanges {
  private _hopes: IHope[];
  @Input() set hopes(value: IHope[]) {
    this.updateTableRows(value);
  }
  @Output() productClicked = new EventEmitter<any>();
  @Output() sendOfferClicked = new EventEmitter<any>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(public userService: UserService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hopes && changes.hopes.currentValue !== changes.hopes.previousValue) {
      this.updateTableRows(changes.hopes.currentValue);
    }
  }

  displayedColumns: string[] = ['user_name', 'deal_method', 'qty', 'price', 'actions'];
  dataSource: MatTableDataSource<IHope>;
  updateTableRows(hopes: IHope[]) {
    if (!hopes) return;
    this.dataSource = new MatTableDataSource(hopes);
    this.dataSource.sort = this.sort;
  }

  onClickRow(row: IHope) {
    this.productClicked.emit(row.id);
  }

  onClickSendOffer(hope: IHope) {
    this.sendOfferClicked.emit(hope);
  }
}
