import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminApiService, ITableConfig } from 'src/app/views/admin/model/admin-api.service';
import { MyDataSource } from 'src/app/views/admin/model/my-data-source';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { SwalService } from 'src/app/services/swal.service';
import { SnackService } from 'src/app/services/snack.service';
import { EditCategoryComponent } from './edit-category/edit-category.component';

@Component({
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, AfterViewInit {
  dataSource: MyDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  displayedColumns = ['name', 'priority', 'actions'];

  tableName = 'categories';
  config: ITableConfig = {
    filter: '',
    sortDirection: 'asc',
    pageIndex: 0,
    pageSize: 10,
  };

  constructor(private apiService: AdminApiService, public dialog: MatDialog, public swal: SwalService, private snack: SnackService) {}

  ngOnInit(): void {
    this.dataSource = new MyDataSource(this.apiService, this.snack);
    this.dataSource.readItems(this.tableName, this.config);
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;

          this.readItems();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.readItems()))
      .subscribe();
  }

  readItems() {
    this.config.filter = this.input.nativeElement.value;
    this.config.sortDirection = this.sort.direction;
    this.config.pageIndex = this.paginator.pageIndex;
    this.config.pageSize = this.paginator.pageSize;

    this.dataSource.readItems(this.tableName, this.config);
  }

  onClickAdd() {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      data: { isEditing: false },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.addItem(this.tableName, result);
      }
    });
  }

  onClickEdit(item) {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      data: { isEditing: true, item: item },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.updateItem(this.tableName, item.id, result);
      }
    });
  }

  async onClickDelete(item) {
    if (await this.swal.confirm()) {
      this.dataSource.deleteItem(this.tableName, item);
    }
  }
}
