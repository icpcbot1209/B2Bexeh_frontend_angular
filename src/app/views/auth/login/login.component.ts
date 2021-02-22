import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackService } from 'src/app/services/snack.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private _formBuilder: FormBuilder, public authService: AuthService, private router: Router, private snack: SnackService) {}
  loginForm: FormGroup;

  busy = false;

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  async onSubmit(event) {
    event.preventDefault();
    if (!this.loginForm.valid) return;
    this.busy = true;

    try {
      await this.authService.emailSignIn(this.loginForm.value);
    } catch (err) {
      console.log(err);
      this.snack.error(err.message);
    }
    this.busy = false;
  }
}
