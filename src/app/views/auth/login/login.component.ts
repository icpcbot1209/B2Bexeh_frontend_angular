import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private _formBuilder: FormBuilder, public authService: AuthService, private router: Router, private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  busy = false;
  onSubmit(event) {
    event.preventDefault();
    if (!this.loginForm.valid) return;
    this.busy = true;
    this.authService.tryLogin(this.loginForm.value).subscribe((res) => {
      this.busy = false;
      console.log(res);
      if (res.code === 200) {
        this.snackbar.open(res.message, "close", { horizontalPosition: "end", verticalPosition: "top", duration: 3000, panelClass: ["green-snackbar"] });
        this.router.navigate(["app/browse"]);
      } else {
        this.snackbar.open(res.message, "close", { horizontalPosition: "end", verticalPosition: "top", duration: 5000, panelClass: ["red-snackbar"] });
      }
    });
  }
}
