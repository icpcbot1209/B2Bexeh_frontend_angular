import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { genralConfig } from 'src/app/constants/genral-config.constant';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProduct } from 'src/app/interfaces/IProduct';
import { SnackService } from 'src/app/services/snack.service';
import { states } from 'src/app/constants/states_titlecase';
import { countries } from 'src/app/constants/country';
import { makeFileName, FileUploadService } from 'src/app/services/file-upload.service';
import { ICategory } from 'src/app/interfaces/ICategory';
import { ISubcategory } from 'src/app/interfaces/ISubcategory';
import { ConstListService } from 'src/app/services/const-list.service';

@Component({
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  theForm: FormGroup;
  states = states;
  countries = countries;

  busy = false;

  newAvatarFile: File = null;
  imagePreview: string;

  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,
    private snack: SnackService,
    private uploadService: FileUploadService,
    public consts: ConstListService
  ) {}

  ngOnInit(): void {
    this.theForm = this._formBuilder.group({
      name: new FormControl({ value: null, disabled: false }, [Validators.required]),
      category_id: new FormControl({ value: null, disabled: false }, [Validators.required]),
      subcategory_id: new FormControl({ value: null, disabled: false }, [Validators.required]),
      release_date: new FormControl({ value: null, disabled: false }, [Validators.required]),
    });

    if (this.data.isEditing) this.setFormData(this.data.item);

    this.getCategories();
  }

  categories: ICategory[] = [];
  subcategories: ISubcategory[] = [];

  async getCategories() {
    this.categories = await this.consts.getCategories();
    this.subcategories = await this.consts.getSubcategories();
  }

  setFormData(item: IProduct) {
    this.imagePreview = item.photo_url;

    this.theForm.setValue({
      name: item.name,
      category_id: item.category_id,
      subcategory_id: item.subcategory_id,
      release_date: item.release_date,
    });
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  async updateItem() {
    if (this.theForm.invalid) {
      return;
    }
    const itemData: IProduct = this.theForm.value;

    this.busy = true;
    try {
      if (this.newAvatarFile) {
        const fileName = makeFileName(this.newAvatarFile, itemData.name);
        const photo_url = await this.uploadService.pushFileToStorage(this.newAvatarFile, '/products', fileName);
        itemData.photo_url = photo_url;
      }

      this.dialogRef.close(itemData);
    } catch (err) {
      console.error(err);
      this.snack.error(err.message);
    }
    this.busy = false;
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.newAvatarFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}

interface DialogData {
  isEditing: boolean;
  item?: IProduct;
}
