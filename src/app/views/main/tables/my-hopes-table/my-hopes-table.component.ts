import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IHope } from 'src/app/interfaces/IHope';
import { ConstListService } from 'src/app/services/const-list.service';
import { HopeService } from 'src/app/services/hope.service';
import { SnackService } from 'src/app/services/snack.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditHopeComponent } from 'src/app/views/main/hope-modals/edit-hope/edit-hope.component';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/interfaces/IProduct';

@Component({
  selector: 'main-my-hopes-table',
  templateUrl: './my-hopes-table.component.html',
  styleUrls: ['./my-hopes-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MyHopesTableComponent implements OnInit {
  constructor(
    public userService: UserService,
    public consts: ConstListService,
    private productService: ProductService,
    private hopeService: HopeService,
    private snack: SnackService,
    public dialog: MatDialog
  ) {}
  @Input() isAsk: boolean;
  @ViewChild(MatSort) sort: MatSort;

  hopes: IHope[] = [];

  displayedColumns: string[] = ['product_name', 'deal_method', 'unit', 'qty', 'price', 'total', 'note'];
  dataSource: MatTableDataSource<IHope>;

  expandedElement: IHope | null;

  ngOnInit(): void {
    this.loadHopes();
  }
  async loadHopes() {
    try {
      this.hopes = await this.hopeService.getMyHopes(this.isAsk).toPromise();
      this.updateTableRows(this.hopes);
    } catch (err) {
      console.error(err);
      this.snack.error(err.message);
    }
  }
  updateTableRows(hopes: IHope[]) {
    if (!hopes) {
      return;
    }
    this.dataSource = new MatTableDataSource(hopes);
    this.dataSource.sort = this.sort;
  }
  onToggleNote(element: IHope, event) {
    event.stopPropagation();
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  async onClickDeleteHope(hope: IHope, event) {
    event.stopPropagation();
    if (!confirm('Confirm delete this bid/ask?')) {
      return;
    }
    try {
      await this.hopeService.deleteHope(hope.id).toPromise();
      this.hopes = this.hopes.filter((x) => x.id !== hope.id);
      this.updateTableRows(this.hopes);

      this.snack.success('Successfully deleted.');
    } catch (err) {
      console.error(err);
      this.snack.error(err.message);
    }
  }

  async onClickEditHope(hope: IHope, event) {
    event.stopPropagation();

    const product = await this.productService.getById(hope.product_id).toPromise();

    this.openHopeModal(this.isAsk, true, product, hope);
  }

  openHopeModal(is_ask: boolean, isEditing: boolean = false, product: IProduct, hope: IHope = null) {
    const dialogRef = this.dialog.open(EditHopeComponent, {
      data: { is_ask, isEditing, product, hope },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result: IHope) => {
      if (!result) {
        return;
      }
      if (!isEditing) {
        this.tryCreateHope(result);
      } else {
        this.tryUpdateHope(result, hope.id);
      }
    });
  }

  async tryCreateHope(hopeData: IHope) {
    try {
      const hope: IHope = await this.hopeService.createHope(hopeData).toPromise();

      this.hopes.push(hope);
      this.updateTableRows(this.hopes);
      this.snack.success('Successfully created.');
    } catch (err) {
      console.error(err);
      this.snack.error(err.message);
    }
  }

  async tryUpdateHope(hopeData: IHope, hopeId) {
    try {
      const hope: IHope = await this.hopeService.updateHope(hopeData, hopeId).toPromise();

      const k = this.hopes.findIndex((x) => x.id === hope.id);
      if (k > -1) {
        this.hopes[k] = hope;
      }
      this.updateTableRows(this.hopes);

      this.snack.success('Successfully updated.');
    } catch (err) {
      console.error(err);
      this.snack.error(err.message);
    }
  }
}
