import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioDatosService } from '../shared/servicio-datos.service'
// import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-vtn-login',
  templateUrl: './vtn-login.component.html',
  styleUrls: ['./vtn-login.component.css']
})
export class VtnLoginComponent implements OnInit {

  hide = true;

  constructor(private router: Router, private servicioDatos: ServicioDatosService) { }

  ngOnInit(): void {
  }

  email = new FormControl('', [
    // Validators.required,
    // Validators.email,
    
  ]);

  loginForm = new FormGroup({
    correo: new FormControl(''),
    passwd: new FormControl('')
  });

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debe ingresar un correo electrónico';
    }

    return this.email.hasError('email') ? 'Correo inválido' : '';
  }

  onSubmit() {
    //LOGIN

    let email1 = this.loginForm.get('correo').value;
    let contrasena = this.loginForm.get('passwd').value;

    console.log(email1);
    console.log(contrasena);
    
    //if (metodo BD validar que es usuario)
    //{
      //if es superusuario
        this.servicioDatos.showTipoUsuario = true;
      //if es asistente
        //this.servicioDatos.showTipoUsuario = false;

      this.servicioDatos.showCorreo = email1;
      this.servicioDatos.showSesion = true;
      this.router.navigate(['principal'])
    //}
  }

}
