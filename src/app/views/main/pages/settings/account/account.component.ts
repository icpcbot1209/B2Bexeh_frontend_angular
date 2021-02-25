import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { states } from 'src/app/constants/states_titlecase';
import { countries } from 'src/app/constants/country';
import { genralConfig } from 'src/app/constants/genral-config.constant';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/interfaces/IUser';
import { SnackService } from 'src/app/services/snack.service';

@Component({
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  constructor(private _formBuilder: FormBuilder, private snack: SnackService, public userService: UserService) {}
  registerForm: FormGroup;
  states = states;
  countries = countries;

  busy = false;

  newAvatarFile: File = null;
  imagePreview: string;

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      email: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.pattern(genralConfig.pattern.EMAIL)]),
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

    if (this.userService.me) this.setWithMine(this.userService.me);
    this.userService.me$.subscribe((me) => {
      if (me) this.setWithMine(me);
    });
  }

  setWithMine(me: IUser) {
    this.imagePreview = me.photo_url;

    this.registerForm.setValue({
      email: me.email,
      user_name: me.user_name,
      company_name: me.company_name,
      first_name: me.first_name,
      last_name: me.last_name,
      phone_number: me.phone_number,
      billing_address_1: me.billing_address_1,
      billing_address_2: me.billing_address_2,
      billing_state: me.billing_state,
      billing_city: me.billing_city,
      billing_zipcode: me.billing_zipcode,
      shipping_address_1: me.shipping_address_1,
      shipping_address_2: me.shipping_address_2,
      shipping_state: me.shipping_state,
      shipping_city: me.shipping_city,
      shipping_zipcode: me.shipping_zipcode,
    });
    this.registerForm.disable();
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  async updateAvatar() {
    const userData: IUser = this.registerForm.value;

    this.busy = true;
    try {
      if (this.newAvatarFile) {
        // this.userService.uploadUserAvatar(this.newAvatarFile, userData.email);
        const photo_url = await this.userService.uploadUserAvatar(this.newAvatarFile, userData.email);
        await this.userService.updateMe({ photo_url }).toPromise();

        this.snack.success('Successfully updated');
      }
    } catch (err) {
      console.error(err);
      this.snack.error(err.message);
    }
    this.busy = false;
  }

  async updateUser() {
    if (this.registerForm.invalid) return;

    const userData: IUser = this.registerForm.value;
    userData.phone_number = this.registerForm.value.phone_number.split('-').join('');

    this.busy = true;
    try {
      if (this.newAvatarFile) {
        // this.userService.uploadUserAvatar(this.newAvatarFile, userData.email);
        const photo_url = await this.userService.uploadUserAvatar(this.newAvatarFile, userData.email);
        userData.photo_url = photo_url;
      }
      await this.userService.updateMe(userData).toPromise();
      this.snack.success('Successfully updated');
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
