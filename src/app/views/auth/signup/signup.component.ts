import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { states } from 'src/app/constants/states_titlecase';
import { countries } from 'src/app/constants/country';
import { genralConfig } from 'src/app/constants/genral-config.constant';
import { AuthService, ICreateCredentials } from 'src/app/shared/auth.service';
import { SnackService } from 'src/app/services/snack.service';
import { IUser } from 'src/app/interfaces/IUser';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private snack: SnackService,
    private router: Router
  ) {}
  registerForm: FormGroup;
  states = states;
  countries = countries;

  busy = false;

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      email: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.pattern(genralConfig.pattern.EMAIL)]),
      password: new FormControl({ value: null, disabled: false }, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(genralConfig.pattern.PASSWORD),
      ]),
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

    this.tryMockData();
  }

  tryMockData() {
    this.registerForm.setValue({
      email: 'demo@demo.com',
      password: 'Demo@123.com',
      user_name: 'Elon',
      company_name: 'Tesla',
      first_name: 'Elon',
      last_name: 'Musk',
      phone_number: '609-937-0261',
      billing_address_1: '2104 Deer Creek Drive',
      billing_address_2: '',
      billing_state: 'NJ',
      billing_city: 'Princeton Meadows',
      billing_zipcode: '08536',
      shipping_address_1: '2104 Deer Creek Drive',
      shipping_address_2: '',
      shipping_state: 'NJ',
      shipping_city: 'Princeton Meadows',
      shipping_zipcode: '08536',
    });
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  async registerUser() {
    if (this.registerForm.invalid) return;
    const userData: IUser = this.registerForm.value;
    userData.role = 'pending';
    userData.phone_number = this.registerForm.value.phone_number.split('-').join('');
    userData.photo_url = '';
    this.busy = true;

    try {
      await this.authService.emailSignUp(userData);
    } catch (err) {
      console.log(err);
      this.snack.error(err.message);
    }
    this.busy = false;
  }
}
