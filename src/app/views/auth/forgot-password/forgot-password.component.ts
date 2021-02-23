import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackService } from 'src/app/services/snack.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(private authService: AuthService, private _formBuilder: FormBuilder, private router: Router, private snack: SnackService) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(event): void {
    event.preventDefault();
    if (!this.forgotPasswordForm.valid) return;

    this.authService
      .sendPasswordResetEmail(this.forgotPasswordForm.value.email)
      .then(() => {
        this.snack.success('Password reset email is sent, you will be redirected to Reset Password page!');

        setTimeout(() => {
          this.router.navigate(['pages/auth/login']);
        }, 6000);
      })
      .catch((error) => {
        this.snack.error('Error: ' + error.message);
      });
  }
}
