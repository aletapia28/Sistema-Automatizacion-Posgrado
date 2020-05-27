import { Injectable } from '@angular/core';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor( public snackBar: MatSnackBar) { }


  config: MatSnackBarConfig ={
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }

success(msg){
  this.config ['panelClass'] = ['notification','success']
  this.snackBar.open(msg,'',this.config);
}

warning(msg){
  this.config ['panelClass'] = ['notification','warning']
  this.snackBar.open(msg,'',this.config);
}

}