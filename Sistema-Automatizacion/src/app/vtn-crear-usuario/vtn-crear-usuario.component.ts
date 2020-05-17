import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService, TokenPayload, Tokenasistant } from '../authentication.service'
import { Router } from '@angular/router';
import { ServicioDatosService } from '../shared/servicio-datos.service'
import { HttpClient } from '@angular/common/http'

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

  constructor(private auth: AuthenticationService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  crearUsuForm = new FormGroup ({
    correo: new FormControl(''),
    nombre: new FormControl(''),
    cedula: new FormControl(''),
    passwd: new FormControl('')
  });

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debe ingresar un correo electrónico';
    }

    return this.email.hasError('email') ? 'Correo inválido' : '';
  }
  

  onSubmit() {
    console.log(this.crearUsuForm.value);

    let email = this.crearUsuForm.get('correo').value;
    let nomb = this.crearUsuForm.get('nombre').value;
    let ced = this.crearUsuForm.get('cedula').value;
    let contrasena = this.crearUsuForm.get('passwd').value;
    
    this.credentials.correo = email;
    this.credentials.password = contrasena;

    this.asist.correo = email;
    this.asist.nombre = nomb;
    this.asist.cedula = ced;


    this.auth.register(this.credentials).subscribe(
      (user) =>
      {console.log('crear usuario' + user)}

    )
    this.auth.registerasist(this.asist).subscribe(
      (user) =>
      {console.log('crear asistente' + user)}
      

    )
  }

    

    

}
