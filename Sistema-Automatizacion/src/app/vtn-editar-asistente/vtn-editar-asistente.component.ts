import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { ServicioDatosService } from '../shared/servicio-datos.service'
import { NotificationService } from '../shared/notification.service';
import { _countGroupLabelsBeforeOption } from '@angular/material/core';

@Component({
  selector: 'app-vtn-editar-asistente',
  templateUrl: './vtn-editar-asistente.component.html',
  styleUrls: ['./vtn-editar-asistente.component.css']
})
export class VtnEditarAsistenteComponent implements OnInit {
  hide = true;

  correoA: string;

  editarAForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    cedula: new FormControl('', [Validators.required]),
    passwd: new FormControl('', [Validators.required])
  });

  constructor(
    private notificationService: NotificationService,
    private http: HttpClient) { }

  ngOnInit(): void {
    const formData = { correo: sessionStorage.getItem('correoAsistente') }
    this.http.post<any>('/router/obtenerAsistente', formData).subscribe(
      (res) => {
        let usuario = res[0];
        console.log(usuario);
        this.editarAForm.get('nombre').setValue(usuario.nombre);
        this.editarAForm.get('passwd').setValue(usuario.password);
        this.editarAForm.get('cedula').setValue(usuario.cedula);
      }
    );
  }

  onSubmit() {
    let correopr = sessionStorage.getItem('correoAsistente');

    let nombr:string = this.editarAForm.get('nombre').value;
    let ced:string = this.editarAForm.get('cedula').value.replace(/\s/g, "");
    let newpass:string = this.editarAForm.get('passwd').value.replace(/\s/g, "");

    nombr = nombr.trim();

    if ((correopr.length > 0) && (newpass.length > 0) && (ced.length > 0) && (nombr.length > 0)) {
      const formData = { correo: correopr, password: newpass, nombre: nombr, cedula: ced }
      //update asistente
      this.http.put<any>('/router/editAsist', formData).subscribe(
        (res) => {
          this.notificationService.success('Usuario actualizado');
        },
        (err) => this.notificationService.warning('Error al actualizar datos')
      );
    }
  }

}
