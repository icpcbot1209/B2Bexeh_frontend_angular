import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IDictItem } from 'src/app/interfaces/IDictItem';
import { ConfigsService } from 'src/app/services/configs.service';

@Component({
  selector: 'main-deal-method-select',
  templateUrl: './deal-method-select.component.html',
  styleUrls: ['./deal-method-select.component.scss'],
})
export class DealMethodSelectComponent implements OnInit, OnDestroy {
  @Output() valueChanged = new EventEmitter<any>();

  configs$: Subscription;
  constructor(public configs: ConfigsService) {}

  ngOnInit(): void {
    if (this.configs.loaded) this.initItems();
    this.configs$ = this.configs.subjectLoaded.subscribe((loaded) => {
      if (loaded) this.initItems();
    });
  }

  ngOnDestroy(): void {
    this.configs$.unsubscribe();
  }

  initItems() {
    this.items = this.configs.dict_deal_method;
    this.theItem = this.configs.dict_deal_method[0];
    this.onSelectItem(this.theItem);
  }

  items: IDictItem[] = [];
  theItem = null;
  onSelectItem(item: IDictItem) {
    this.valueChanged.emit(item.uid);
  }
}
