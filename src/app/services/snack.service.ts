import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  constructor(private ngZone: NgZone, private snackbar: MatSnackBar) {}

  success(message: string) {
    this.ngZone.run(() => {
      this.snackbar.open(message, 'close', { horizontalPosition: 'end', verticalPosition: 'top', duration: 3000, panelClass: ['green-snackbar'] });
    });
  }

  error(message: string) {
    this.ngZone.run(() => {
      this.snackbar.open(message, 'close', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5000,
        panelClass: ['red-snackbar'],
      });
    });
  }
}
