import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IHope } from 'src/app/interfaces/IHope';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'market-hopes-table',
  templateUrl: './hopes-table.component.html',
  styleUrls: ['./hopes-table.component.scss'],
})
export class HopesTableComponent implements OnInit {
  @Input() set hopes(value: IHope[]) {
    this.updateTableRows(value);
  }
  get hopes(): IHope[] {
    return this._hopes;
  }

  constructor(private productService: ProductService) {}
  @Input() is_ask: boolean;

  private _hopes: IHope[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['select', 'dealer_name', 'product_name', 'deal_method', 'qty', 'price', 'total', 'unit'];

  dataSource: MatTableDataSource<IHope>;

  selection = new SelectionModel<IHope>(true, []);

  ngOnInit(): void {}
  updateTableRows(hopes: IHope[]) {
    if (!hopes) { return; }
    this.dataSource = new MatTableDataSource(hopes);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  onClickRow(row: IHope) {
    console.log(row);
  }
}
