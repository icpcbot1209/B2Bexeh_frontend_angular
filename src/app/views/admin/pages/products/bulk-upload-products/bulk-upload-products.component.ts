import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackService } from 'src/app/services/snack.service';

@Component({
  templateUrl: './bulk-upload-products.component.html',
  styleUrls: ['./bulk-upload-products.component.scss'],
})
export class BulkUploadProductsComponent implements OnInit {
  text: string;
  constructor(
    public dialogRef: MatDialogRef<BulkUploadProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snack: SnackService
  ) {}

  ngOnInit(): void {}

  onClickUpload() {
    let txt = this.text.trim();
    this.dialogRef.close(txt);
  }
}

interface DialogData {
  tableName: string;
}
