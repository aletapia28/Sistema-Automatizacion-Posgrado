import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';
import { HttpClient, HttpParams } from '@angular/common/http'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-vtn-recuperar-pass',
  templateUrl: './vtn-recuperar-pass.component.html',
  styleUrls: ['./vtn-recuperar-pass.component.css']
})
export class VtnRecuperarPassComponent implements OnInit {

  passForm = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<VtnRecuperarPassComponent>,
    private http: HttpClient,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
  }


  closeDialog() {
    this.dialogRef.close(false);
  }

  enviar() {
    let correo: string = this.passForm.get('correo').value.replace(/\s/g, "");
    if (correo != null) {
      const formData = { correo: correo }
      this.http.post<any>('/router/UpdatePassword', formData).subscribe(
        (respost) => {
          console.log(respost);
          let asunto = 'Maestría en Gerencia de Proyectos: Cambio de contraseña'
          let cuerpo = `Buenas,\nEl sistema ha detectado su solicitud de cambio de contraseña.\n\nSu nueva contraseña es ${respost.password}.\n\nMuchas gracias.\n\nCualquier consulta al correo gpm@itcr.ac.cr`;
          const formData = {para: correo, asunto: asunto, texto: cuerpo}
          this.http.put<any>('/router/EnviarCorreo', formData).subscribe(
            (respost) => {
               this.notificationService.success(`Correo enviado a ${correo}`);
            }
          );
        }
      );
    }
  }

}
