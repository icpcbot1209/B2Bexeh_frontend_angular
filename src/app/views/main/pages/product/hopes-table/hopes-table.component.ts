import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { IHope } from 'src/app/interfaces/IHope';
import { ConfigsService } from 'src/app/services/configs.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'main-hopes-table',
  templateUrl: './hopes-table.component.html',
  styleUrls: ['./hopes-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HopesTableComponent implements OnChanges {
  private _hopes: IHope[];
  @Input() set hopes(value: IHope[]) {
    this.updateTableRows(value);
  }
  @Output() productClicked = new EventEmitter<any>();
  @Output() sendOfferClicked = new EventEmitter<any>();
  @Output() deleteHopeClicked = new EventEmitter<any>();
  @Output() saveHopeClicked = new EventEmitter<any>();

  @ViewChild(MatSort) sort: MatSort;

  expandedElement: IHope | null;

  constructor(public userService: UserService, public configs: ConfigsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hopes && changes.hopes.currentValue !== changes.hopes.previousValue) {
      this.updateTableRows(changes.hopes.currentValue);
    }
  }

  displayedColumns: string[] = ['dealer_name', 'deal_method', 'unit', 'qty', 'price', 'total', 'note'];
  dataSource: MatTableDataSource<IHope>;
  updateTableRows(hopes: IHope[]) {
    if (!hopes) return;
    this.dataSource = new MatTableDataSource(hopes);
    this.dataSource.sort = this.sort;
  }

  onClickSendOffer(hope: IHope, isAccept: boolean, event) {
    event.stopPropagation();

    this.sendOfferClicked.emit({ hope, isAccept });
  }

  onToggleNote(element: IHope, event) {
    event.stopPropagation();
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  onClickDeleteHope(hope: IHope, event) {
    event.stopPropagation();

    if (confirm('Confirm delete this bid/ask?')) {
      this.deleteHopeClicked.emit(hope);
    }
  }

  onClickSaveHope(hope: IHope, event) {
    event.stopPropagation();

    this.saveHopeClicked.emit(hope);
  }
}
