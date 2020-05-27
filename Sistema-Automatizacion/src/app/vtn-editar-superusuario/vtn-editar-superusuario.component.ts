import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioDatosService } from '../shared/servicio-datos.service'
import { AuthenticationService } from '../authentication.service'
import { HttpClient } from '@angular/common/http'
import { ErrorStateMatcher } from '@angular/material/core';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-vtn-editar-superusuario',
  templateUrl: './vtn-editar-superusuario.component.html',
  styleUrls: ['./vtn-editar-superusuario.component.css']
})
export class VtnEditarSuperusuarioComponent implements OnInit {
  hide = true;

  editarSupForm = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]),
    passwd: new FormControl('', [Validators.required])
  });

  constructor(
    private http: HttpClient, 
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    const formData = { correo: sessionStorage.getItem('correo') }
    this.http.post<any>('/router/obtenerSuperusuario', formData).subscribe(
      (res) => {
        let usuario = res[0][0];
        this.editarSupForm.get('correo').setValue(usuario.correoEnvio);
        this.editarSupForm.get('passwd').setValue(usuario.password);
      },
      (err) => console.log(err)
    );
  }

  getErrorMessage() {
    if (this.editarSupForm.get('correo').hasError('required')) {
      return 'Debe ingresar un correo electrónico';
    }

    return this.editarSupForm.get('correo').hasError('email') ? 'Correo inválido' : '';
  }

  onSubmit() {
    let correopr = sessionStorage.getItem('correo');

    let correnv: string = this.editarSupForm.get('correo').value;
    let newpass: string = this.editarSupForm.get('passwd').value;

    if ((correnv.length > 0) && (newpass.length > 0)) {
      const formData = { correo: correopr, password: newpass, correoEnvio: correnv }

      //actualiza correo en superusuario
      this.http.put<any>('/router/editSuper', formData).subscribe(
        (res) => {
          this.notificationService.success('Usuario actualizado'); 
        },
        (err) => console.log(err)
      );
    }
  }

}
