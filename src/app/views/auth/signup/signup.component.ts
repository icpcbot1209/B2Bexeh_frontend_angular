import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { states } from "src/app/constants/states_titlecase";
import { countries } from "src/app/constants/country";
import { genralConfig } from "src/app/constants/genral-config.constant";
import { AuthService } from "src/app/shared/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  states = states;
  countries = countries;

  constructor(private _formBuilder: FormBuilder, private authService: AuthService, private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      email: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.pattern(genralConfig.pattern.EMAIL)]),
      first_name: new FormControl({ value: null, disabled: false }, [Validators.required]),
      last_name: new FormControl({ value: null, disabled: false }, [Validators.required]),
      password: new FormControl({ value: null, disabled: false }, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(genralConfig.pattern.PASSWORD),
      ]),
      companyname: new FormControl({ value: null, disabled: false }, [Validators.required]),
      phone_number: new FormControl({ value: null, disabled: false }, [
        Validators.required,
        Validators.pattern(genralConfig.pattern.PHONE_NO_NEW),
        Validators.minLength(10),
        Validators.maxLength(16),
      ]),
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

    this.tryMockData();
  }

  tryMockData() {
    this.registerForm.setValue({
      email: "demo@demo.com",
      first_name: "demo",
      last_name: "demo",
      password: "Monkey@123.com",
      companyname: "demo",
      phone_number: "609-937-0261",
      billingaddress1: "2104 Deer Creek Drive",
      billingaddress2: "",
      billingstate: "NJ",
      billingcity: "Princeton Meadows",
      billingzipcode: "08536",
      shippingaddress1: "2104 Deer Creek Drive",
      shippingaddress2: "",
      shippingstate: "NJ",
      shippingcity: "Princeton Meadows",
      shippingzipcode: "08536",
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
  registerUser() {
    if (this.registerForm.valid) {
      var obj = this.registerForm.value;
      obj.role = "user";
      obj.phone_number = this.registerForm.value.phone_number.split("-").join("");
      obj.is_active = false;
      this.busy = true;

      this.authService.trySignup(obj).subscribe((res) => {
        this.busy = false;
        if (res.code === 200) {
          this.snackbar.open(res.message, "close", { horizontalPosition: "end", verticalPosition: "top", duration: 3000, panelClass: ["green-snackbar"] });
        } else {
          this.snackbar.open(res.message, "close", { horizontalPosition: "end", verticalPosition: "top", duration: 5000, panelClass: ["red-snackbar"] });
        }
      });
    }
  }
}
