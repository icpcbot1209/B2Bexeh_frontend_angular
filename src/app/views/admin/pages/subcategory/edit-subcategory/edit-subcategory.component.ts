import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { genralConfig } from 'src/app/constants/genral-config.constant';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackService } from 'src/app/services/snack.service';
import { UserService } from 'src/app/services/user.service';
import { states } from 'src/app/constants/states_titlecase';
import { countries } from 'src/app/constants/country';
import { ISubcategory } from 'src/app/interfaces/ISubcategory';

@Component({
  templateUrl: './edit-subcategory.component.html',
  styleUrls: ['./edit-subcategory.component.scss'],
})
export class EditSubcategoryComponent implements OnInit {
  theForm: FormGroup;
  states = states;
  countries = countries;

  busy = false;

  newAvatarFile: File = null;
  imagePreview: string;

  constructor(
    public dialogRef: MatDialogRef<EditSubcategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,
    private snack: SnackService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.theForm = this._formBuilder.group({
      name: new FormControl({ value: null, disabled: false }, [Validators.required]),
    });

    if (this.data.isEditing) this.setFormData(this.data.item);
  }

  setFormData(item: ISubcategory) {
    this.theForm.setValue({
      name: item.name,
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
    const itemData: ISubcategory = this.theForm.value;
    this.dialogRef.close(itemData);
  }
}

interface DialogData {
  isEditing: boolean;
  item?: ISubcategory;
}