import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService, TokenPayload, Tokenasistant } from '../authentication.service';
import { Router } from '@angular/router';
import { ServicioDatosService } from '../shared/servicio-datos.service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-vtn-crear-usuario',
  templateUrl: './vtn-crear-usuario.component.html',
  styleUrls: ['./vtn-crear-usuario.component.css']
})

export class VtnCrearUsuarioComponent implements OnInit {
  hide = true;

  credentials: TokenPayload = {
    correo: '',
    password: '',
  }

  asist: Tokenasistant = {

    correo: '',
    nombre: '',
    cedula: ''
  }

  constructor(
    private auth: AuthenticationService, 
    private http: HttpClient,
    private notificationService: NotificationService
    ) { }

  ngOnInit(): void {
  }

  crearUsuForm = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]),
    nombre: new FormControl('', [Validators.required]),
    cedula: new FormControl('', [Validators.required]),
    passwd: new FormControl('', [Validators.required])
  });

  getErrorMessage() {
    if (this.crearUsuForm.get('correo').hasError('required')) {
      return 'Debe ingresar un correo electrónico';
    }
    return this.crearUsuForm.get('correo').hasError('email') ? 'Correo inválido' : '';
  }

  onSubmit() {
    let email:string = this.crearUsuForm.get('correo').value.replace(/\s/g, "");
    let nomb:string = this.crearUsuForm.get('nombre').value.replace(/\s/g, "");
    let ced:string = this.crearUsuForm.get('cedula').value.replace(/\s/g, "");
    let contrasena:string = this.crearUsuForm.get('passwd').value.replace(/\s/g, "");

    if ((email.length > 0) && (contrasena.length > 0) && (ced.length > 0) && (nomb.length > 0)) {
      const formData = { correo: email, password: contrasena, nombre: nomb, cedula: ced }
      this.http.post<any>('/router/registerasistente', formData).subscribe(
        (respost) => {
          this.notificationService.success('Usuario creado');
        },
        (err) => this.notificationService.success('Los datos no son correctos,\nusuario no creado')
      );
    }

  }





}
