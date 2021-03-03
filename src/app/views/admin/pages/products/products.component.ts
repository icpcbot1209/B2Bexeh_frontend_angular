import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminApiService, ITableConfig } from 'src/app/views/admin/model/admin-api.service';
import { MyDataSource } from 'src/app/views/admin/model/my-data-source';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EditProductComponent } from './edit-product/edit-product.component';

import { SwalService } from 'src/app/services/swal.service';
import { SnackService } from 'src/app/services/snack.service';
import { ConstListService } from 'src/app/services/const-list.service';
import { ICategory } from 'src/app/interfaces/IProduct';
import { ISubcategory } from 'src/app/interfaces/IProduct';
import { BulkUploadProductsComponent } from './bulk-upload-products/bulk-upload-products.component';
import { IProduct } from 'src/app/interfaces/IProduct';

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  dataSource: MyDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  displayedColumns = ['photo_url', 'category_id', 'subcategory_id', 'name', 'release_date', 'actions'];

  tableName = 'products';
  config: ITableConfig = {
    filter: '',
    sortDirection: 'asc',
    pageIndex: 0,
    pageSize: 10,
  };

  categories: ICategory[] = [];
  subcategories: ISubcategory[] = [];

  constructor(
    private apiService: AdminApiService,
    public consts: ConstListService,
    public dialog: MatDialog,
    public swal: SwalService,
    private snack: SnackService
  ) {}

  async loadConsts() {
    this.categories = await this.consts.getCategories(true);
    this.subcategories = await this.consts.getSubcategories(true);
  }

  ngOnInit() {
    this.loadConsts();

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
    const dialogRef = this.dialog.open(EditProductComponent, {
      data: { isEditing: false },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.addItem(this.tableName, result);
      }
    });
  }

  onClickAddBulk() {
    const dialogRef = this.dialog.open(BulkUploadProductsComponent, {
      data: { tableName: this.tableName },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.analyzeText(result);
      }
    });
  }

  async analyzeText(txt: string) {
    this.bulklogs = [];

    txt = txt.trim();

    let rows = txt.split('\n');

    for (let i = 0; i < rows.length; i++) {
      let row = rows[i];
      let cols = row.split(',').map((x) => x.trim());

      let productData: IProduct = {};
      let category_name = cols[0];
      let subcategory_name = cols[1];
      productData.category_id = this.categories.find((x) => x.name === category_name)?.id;
      productData.subcategory_id = this.subcategories.find((x) => x.name === subcategory_name)?.id;
      productData.name = cols[2];
      productData.release_date = new Date(cols[3]);

      console.log(productData);

      if (this.checkValid(productData, i)) {
        await this.dataSource.addItem('products', productData);
      }
    }
  }

  bulklogs: string[] = [];

  checkValid(p: IProduct, ii: number) {
    if (!p.name) this.bulklogs.push(`Row(${ii}), Col(0) has invalid Product Name. Please Retry.\n`);
    else if (!p.category_id) this.bulklogs.push(`Row(${ii}), Col(1) has invalid Sports. Please Retry.\n`);
    else if (!p.subcategory_id) this.bulklogs.push(`Row(${ii}), Col(2) has invalid Year. Please Retry.\n`);
    else if (!p.release_date) this.bulklogs.push(`Row(${ii}), Col(3) has invalid Release Date. Please Retry.\n`);
    else {
      this.bulklogs.push(`Row(${ii}) was successful.`);
      return true;
    }

    return false;
  }

  onClickEdit(item) {
    const dialogRef = this.dialog.open(EditProductComponent, {
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
