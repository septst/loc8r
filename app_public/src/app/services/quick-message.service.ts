import { Injectable } from '@angular/core';
import {
  MatSnackBar, MatSnackBarConfig,
  MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition, TextOnlySnackBar
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class QuickMessageService {

  private horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';
  private options: MatSnackBarConfig = {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
    duration:2000 //2seconds
  }

  constructor(private _snackBar: MatSnackBar) { }

  push(message: string): MatSnackBarRef<TextOnlySnackBar> {
    let snackBarRef = this._snackBar.open(message, "Dismiss", this.options);
    return snackBarRef;
  }
}
