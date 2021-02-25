import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { AdminApiService, ITableConfig } from './admin-api.service';
import { catchError, finalize } from 'rxjs/operators';
import { SnackService } from 'src/app/services/snack.service';

export class MyDataSource implements DataSource<any> {
  items: any[] = [];
  private itemsSubject = new BehaviorSubject<any[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public countFiltered = 10;

  constructor(private apiService: AdminApiService, private snack: SnackService) {}

  readItems(tableName: string, config: ITableConfig) {
    this.loadingSubject.next(true);

    this.apiService
      .readItems(tableName, config)
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe(({ items, countFiltered }) => {
        this.countFiltered = countFiltered;
        this.items = items;
        this.itemsSubject.next(this.items);
      });
  }

  async addItem(tableName, itemData) {
    this.loadingSubject.next(true);
    try {
      const newItem = await this.apiService.createItem(tableName, itemData).toPromise();
      this.items.push(newItem);

      this.itemsSubject.next(this.items);
    } catch (err) {
      console.error(err);
      this.snack.error(err.message);
    }
    this.loadingSubject.next(false);
  }

  async updateItem(tableName, itemId, itemData) {
    this.loadingSubject.next(true);
    try {
      await this.apiService.updateItem(tableName, itemId, itemData).toPromise();
      let k = this.items.findIndex((x) => x.id == itemId);
      if (k > -1) Object.assign(this.items[k], itemData);

      this.itemsSubject.next(this.items);
    } catch (err) {
      console.error(err);
      this.snack.error(err.message);
    }
    this.loadingSubject.next(false);
  }

  async deleteItem(tableName, item) {
    this.loadingSubject.next(true);
    try {
      const resp = await this.apiService.deleteItem(tableName, item).toPromise();
      this.items = this.items.filter((x) => x.id !== item.id);
      this.countFiltered--;
      this.itemsSubject.next(this.items);
    } catch (err) {
      console.error(err);
      this.snack.error(err.message);
    }
    this.loadingSubject.next(false);
  }

  connect(collectionViewer: CollectionViewer): Observable<any[] | readonly any[]> {
    return this.itemsSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.itemsSubject.complete();
    this.loadingSubject.complete();
  }
}
