import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConstListService, IDictItem } from 'src/app/services/const-list.service';

@Component({
  selector: 'main-deal-method-select',
  templateUrl: './deal-method-select.component.html',
  styleUrls: ['./deal-method-select.component.scss'],
})
export class DealMethodSelectComponent implements OnInit {
  @Input() isAll: boolean = false;
  @Output() valueChanged = new EventEmitter<any>();

  constructor(public consts: ConstListService) {}

  items: IDictItem[] = [];
  theItem = null;

  ngOnInit(): void {
    this.initItems();
  }

  initItems() {
    this.items = this.consts.dict_deal_method;
    if (!this.isAll) this.items = this.items.slice(1);
  }
  onSelectItem(item: IDictItem) {
    this.valueChanged.emit(item.id);
  }
}
