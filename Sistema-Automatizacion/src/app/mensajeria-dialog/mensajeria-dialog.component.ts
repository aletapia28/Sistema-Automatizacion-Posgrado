import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '../shared/dialog.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-mensajeria-dialog',
  templateUrl: './mensajeria-dialog.component.html',
  styleUrls: ['./mensajeria-dialog.component.css']
})
export class MensajeriaDialogComponent implements OnInit {

  mensajeriaForm = new FormGroup({
    correo: new FormControl(null, [Validators.required, Validators.email]),
    passwd: new FormControl(null, [Validators.required])
  });

  hide = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<MensajeriaDialogComponent>,
    private http: HttpClient,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    const formData = { }
    this.http.post<any>('/router/ObtenerMensajeria', formData).subscribe(
      (res) => {
        let usuario = res[0][0];
        this.mensajeriaForm.get('correo').setValue(usuario.correo);
        this.mensajeriaForm.get('passwd').setValue(usuario.password);
      }
    );
  }

  getErrorMessage() {
    if (this.mensajeriaForm.get('correo').hasError('required')) {
      return 'Debe ingresar un correo electrónico';
    }
    return this.mensajeriaForm.get('correo').hasError('email') ? 'Correo inválido' : '';
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  admitidos() {
    let correo = this.mensajeriaForm.get('correo').value.replace(/\s/g, "");
    let newpass = this.mensajeriaForm.get('passwd').value.replace(/\s/g, "");

    if ((correo != null) && (newpass != null)) { 
      const formData = { correo: correo, password: newpass }

      //actualiza correo en superusuario
      this.http.post<any>('/router/EditarMensajeria', formData).subscribe(
        (res) => {
          this.notificationService.success('Mensajería actualizada'); 
        },
        (err) => this.notificationService.warning('Error al actualizar datos')
      );
    }
  }

}
