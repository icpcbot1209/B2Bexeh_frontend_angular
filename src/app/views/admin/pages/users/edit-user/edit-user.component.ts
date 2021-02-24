import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { genralConfig } from 'src/app/constants/genral-config.constant';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from 'src/app/interfaces/IUser';
import { SnackService } from 'src/app/services/snack.service';
import { UserService } from 'src/app/services/user.service';
import { states } from 'src/app/constants/states_titlecase';
import { countries } from 'src/app/constants/country';

@Component({
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  theForm: FormGroup;
  states = states;
  countries = countries;

  busy = false;

  newAvatarFile: File = null;
  imagePreview: string;

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,
    private snack: SnackService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.theForm = this._formBuilder.group({
      email: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.pattern(genralConfig.pattern.EMAIL)]),
      role: new FormControl({ value: null, disabled: false }, [Validators.required]),
      user_name: new FormControl({ value: null, disabled: false }, [Validators.required]),
      company_name: new FormControl({ value: null, disabled: false }, [Validators.required]),
      first_name: new FormControl({ value: null, disabled: false }, [Validators.required]),
      last_name: new FormControl({ value: null, disabled: false }, [Validators.required]),
      phone_number: new FormControl({ value: null, disabled: false }, [Validators.required]),
      billing_address_1: new FormControl({ value: null, disabled: false }, [Validators.required]),
      billing_address_2: new FormControl({ value: null, disabled: false }),
      billing_state: new FormControl({ value: null, disabled: false }, [Validators.required]),
      billing_city: new FormControl({ value: null, disabled: false }, [Validators.required]),
      billing_zipcode: new FormControl({ value: null, disabled: false }, [Validators.required]),
      shipping_address_1: new FormControl({ value: null, disabled: false }, [Validators.required]),
      shipping_address_2: new FormControl({ value: null, disabled: false }),
      shipping_state: new FormControl({ value: null, disabled: false }, [Validators.required]),
      shipping_city: new FormControl({ value: null, disabled: false }, [Validators.required]),
      shipping_zipcode: new FormControl({ value: null, disabled: false }, [Validators.required]),
    });

    this.setFormData(this.data.item);
  }

  setFormData(item: IUser) {
    this.imagePreview = item.photo_url;

    this.theForm.setValue({
      email: item.email,
      role: item.role,
      user_name: item.user_name,
      company_name: item.company_name,
      first_name: item.first_name,
      last_name: item.last_name,
      phone_number: item.phone_number,
      billing_address_1: item.billing_address_1,
      billing_address_2: item.billing_address_2,
      billing_state: item.billing_state,
      billing_city: item.billing_city,
      billing_zipcode: item.billing_zipcode,
      shipping_address_1: item.shipping_address_1,
      shipping_address_2: item.shipping_address_2,
      shipping_state: item.shipping_state,
      shipping_city: item.shipping_city,
      shipping_zipcode: item.shipping_zipcode,
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
    const itemData: IUser = this.theForm.value;
    itemData.phone_number = this.theForm.value.phone_number.split('-').join('');

    this.busy = true;
    try {
      if (this.newAvatarFile) {
        const photo_url = await this.userService.uploadUserAvatar(this.newAvatarFile, itemData.email);
        itemData.photo_url = photo_url;
      }

      this.dialogRef.close(itemData);
    } catch (err) {
      console.log(err);
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
  item: IUser;
}
