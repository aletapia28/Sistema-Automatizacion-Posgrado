import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DescargarMemoComponent } from '../descargar-memo/descargar-memo.component';
import { VtnRecuperarPassComponent } from '../vtn-recuperar-pass/vtn-recuperar-pass.component';
import { VtnRepostularComponent } from '../vtn-repostular/vtn-repostular.component';
import { AdmitidosDialogComponent } from '../admitidos-dialog/admitidos-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg, des) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: "390px",
      panelClass: 'cuerpo-dialog-container',
      disableClose: true,
      position: { top: "250px" },
      data: {
        message: msg,
        message1: des,
        btn1: 'Sí',
        btn2: 'No',
      }
    });
  }

  openDownloadDialog(msg, des) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: "390px",
      panelClass: 'cuerpo-dialog-container',
      disableClose: true,
      position: { top: "250px" },
      data: {
        message: msg,
        message1: des,
        btn1: 'XLSX',
        btn2: 'CSV'
      }
    });
  }

  openGenerateMemo(msg, des) {
    return this.dialog.open(DescargarMemoComponent, {
      width: "390px",
      panelClass: 'cuerpo-dialog-container',
      disableClose: true,
      position: { top: "250px" },
      data: {
        message: msg,
        message1: des,
        btn1: 'PDF',
        btn2: 'DOC',
        btn3: 'Email'
      }
    });
  }

  openRecoverPass(msg, des) {
    return this.dialog.open(VtnRecuperarPassComponent, {
      width: "390px",
      panelClass: 'cuerpo-dialog-container',
      disableClose: true,
      position: { top: "25vh" },
      data: {
        message: msg,
        message1: des,
      }
    });
  }

  openRepostulate(msg, des) {
    return this.dialog.open(VtnRepostularComponent, {
      width: "390px",
      panelClass: 'cuerpo-dialog-container',
      disableClose: true,
      position: { top: "20vh" },
      data: {
        message: msg,
        message1: des,
        btn2: 'No',
        btn1: 'Si',
      }
    })
  }

  openAdmitidosDialog(msg, des) {
    return this.dialog.open(AdmitidosDialogComponent, {
      width: "390px",
      panelClass: 'cuerpo-dialog-container',
      disableClose: true,
      position: { top: "20vh" },
      data: {
        message: msg,
        message1: des,
        btn2: 'Cancelar',
        btn1: 'Aceptar',
      }
    })
  }

}
