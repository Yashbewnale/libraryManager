import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = 'Close', type: 'success' | 'error' = 'success', durationInSeconds: number = 3000000) {
    this.snackBar.open(message, action, {
      duration: durationInSeconds * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: type === 'success' ? ['snack-bar-success'] : ['snack-bar-error']
    });
  }
}
