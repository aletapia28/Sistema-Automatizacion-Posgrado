import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg,des){
   return this.dialog.open(ConfirmDialogComponent,{
      width: "390px",
      panelClass: 'cuerpo-dialog-container',
      disableClose: true,
      position : {top: "250px"},
      data :{
        message : msg,
        message1 : des,
        btn1 : 'Sí',
        btn2 : 'No',
      }
    });
  }

  openDownloadDialog(msg,des){
    return this.dialog.open(ConfirmDialogComponent,{
       width: "390px",
       panelClass: 'cuerpo-dialog-container',
       disableClose: true,
       position : {top: "250px"},
       data :{
         message : msg,
         message1 : des,
         btn1 : 'XSLX',
         btn2 : 'CSV' 
       } 
     });
   }
}
