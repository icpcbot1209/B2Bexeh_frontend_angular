import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { IHope } from 'src/app/interfaces/IHope';
import { ConstListService } from 'src/app/services/const-list.service';
import { UserService } from 'src/app/services/user.service';
import { SwalService } from 'src/app/services/swal.service';

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
  @Input() set hopes(value: IHope[]) {
    this.updateTableRows(value);
  }

  constructor(public userService: UserService, public consts: ConstListService, private swal: SwalService) {}
  private _hopes: IHope[];
  @Output() productClicked = new EventEmitter<any>();
  @Output() sendOfferClicked = new EventEmitter<any>();
  @Output() deleteHopeClicked = new EventEmitter<any>();
  @Output() editHopeClicked = new EventEmitter<any>();

  @ViewChild(MatSort) sort: MatSort;

  expandedElement: IHope | null;

  displayedColumns: string[] = ['dealer_name', 'deal_method', 'unit', 'qty', 'price', 'total', 'note'];
  dataSource: MatTableDataSource<IHope>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hopes && changes.hopes.currentValue !== changes.hopes.previousValue) {
      this.updateTableRows(changes.hopes.currentValue);
    }
  }
  updateTableRows(hopes: IHope[]) {
    if (!hopes) {
      return;
    }
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

  async onClickDeleteHope(hope: IHope, event) {
    event.stopPropagation();

    if (await this.swal.confirm('Confirm delete this bid/ask?')) {
      this.deleteHopeClicked.emit(hope);
    }
  }

  onClickEditHope(hope: IHope, event) {
    event.stopPropagation();

    this.editHopeClicked.emit(hope);
  }
}
