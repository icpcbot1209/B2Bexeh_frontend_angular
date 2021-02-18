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
  registerForm: FormGroup;
  states = states;
  countries = countries;

  constructor(private _formBuilder: FormBuilder, private snack: SnackService, private userService: UserService) {
    // this.pickInvalidFields();
  }

  pickInvalidFields() {
    setInterval(() => {
      if (this.registerForm) {
        const invalid = [];
        const controls = this.registerForm.controls;
        for (const name in controls) {
          if (controls[name].invalid) {
            invalid.push(name);
          }
        }
        console.log(invalid);
      }
      console.log(this.registerForm?.valid);
    }, 1000);
  }

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      email: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.pattern(genralConfig.pattern.EMAIL)]),
      user_name: new FormControl({ value: null, disabled: false }, [Validators.required]),
      first_name: new FormControl({ value: null, disabled: false }, [Validators.required]),
      last_name: new FormControl({ value: null, disabled: false }, [Validators.required]),
      // password: new FormControl({ value: null, disabled: false }, [
      //   Validators.required,
      //   Validators.minLength(6),
      //   Validators.pattern(genralConfig.pattern.PASSWORD),
      // ]),
      companyname: new FormControl({ value: null, disabled: false }, [Validators.required]),
      phone_number: new FormControl({ value: null, disabled: false }, [Validators.required]),
      billingaddress1: new FormControl({ value: null, disabled: false }, [Validators.required]),
      billingaddress2: new FormControl({ value: null, disabled: false }),
      billingstate: new FormControl({ value: null, disabled: false }, [Validators.required]),
      billingcity: new FormControl({ value: null, disabled: false }, [Validators.required]),
      billingzipcode: new FormControl({ value: null, disabled: false }, [Validators.required]),
      shippingaddress1: new FormControl({ value: null, disabled: false }, [Validators.required]),
      shippingaddress2: new FormControl({ value: null, disabled: false }),
      shippingstate: new FormControl({ value: null, disabled: false }, [Validators.required]),
      shippingcity: new FormControl({ value: null, disabled: false }, [Validators.required]),
      shippingzipcode: new FormControl({ value: null, disabled: false }, [Validators.required]),
    });

    const me = this.userService.me;
    if (me) this.setWithMine(me);
    this.userService.me$.subscribe((me) => {
      if (me) this.setWithMine(me);
    });
  }

  setWithMine(me: IUser) {
    this.imagePreview = me.profile_image_url;

    this.registerForm.setValue({
      email: me.email,
      user_name: me.user_name,
      first_name: me.first_name,
      last_name: me.last_name,
      // password: '',
      companyname: me.company_name,
      phone_number: me.phone_number,
      billingaddress1: me.billingaddress1,
      billingaddress2: me.billingaddress2,
      billingstate: me.billingstate,
      billingcity: me.billingcity,
      billingzipcode: me.billingzipcode,
      shippingaddress1: me.shippingaddress1,
      shippingaddress2: me.shippingaddress2,
      shippingstate: me.shippingstate,
      shippingcity: me.shippingcity,
      shippingzipcode: me.shippingzipcode,
    });
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  busy = false;
  async updateUser() {
    if (this.registerForm.invalid) return;
    var userData: IUser = this.registerForm.value;
    userData.phone_number = this.registerForm.value.phone_number.split('-').join('');

    this.busy = true;
    try {
      if (this.newAvatarFile) {
        // this.userService.uploadUserAvatar(this.newAvatarFile, userData.email);
        const profile_image_url = await this.userService.uploadUserAvatar(this.newAvatarFile, userData.email);
        userData.profile_image_url = profile_image_url;
      }
      await this.userService.updateUser(userData).toPromise();
      this.snack.success('Successfully updated');
    } catch (err) {
      console.log(err);
      this.snack.error(err.message);
    }
    this.busy = false;
  }

  newAvatarFile: File = null;
  imagePreview: string;
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
