import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IDealmethod } from 'src/app/interfaces/IDealmethod';
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

  items = [];
  theItem = null;

  ngOnInit(): void {
    this.initItems();
  }

  async initItems() {
    const arr = await this.consts.getDealmethods();
    arr.sort((x, y) => {
      if (x.priority === y.priority) return 0;
      if (x.priority > y.priority) return 1;
      return -1;
    });
    if (this.isAll) arr.unshift({ id: 'all', name: 'All' });

    this.items = arr;
  }
  onSelectItem(item) {
    this.valueChanged.emit(item.id);
  }
}
