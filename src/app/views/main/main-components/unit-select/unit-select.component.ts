import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConstListService, IDictItem } from 'src/app/services/const-list.service';

@Component({
  selector: 'main-unit-select',
  templateUrl: './unit-select.component.html',
  styleUrls: ['./unit-select.component.scss'],
})
export class UnitSelectComponent implements OnInit {
  @Input() isAll: boolean = false;
  @Output() valueChanged = new EventEmitter<any>();

  constructor(public consts: ConstListService) {}

  items: IDictItem[] = [];
  theItem = null;

  ngOnInit(): void {
    this.initItems();
  }

  initItems() {
    this.items = this.consts.dict_unit;
    if (!this.isAll) this.items = this.items.slice(1);
  }
  onSelectItem(item: IDictItem) {
    this.valueChanged.emit(item.uid);
  }
}
