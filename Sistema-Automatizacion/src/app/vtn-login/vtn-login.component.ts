import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioDatosService } from '../shared/servicio-datos.service'
import { AuthenticationService, TokenPayload } from '../authentication.service'

@Component({
  selector: 'app-vtn-login',
  templateUrl: './vtn-login.component.html',
  styleUrls: ['./vtn-login.component.css']
})
export class VtnLoginComponent implements OnInit {
  credentials: TokenPayload = {
    correo: 'kaka@fff.com',
    password: 'pooqq'
  }

  hide = true;

  constructor(private auth: AuthenticationService, private router: Router, private servicioDatos: ServicioDatosService) { }

  ngOnInit(): void {
  }

  email = new FormControl('', [
    Validators.required,
    Validators.email,
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

    let email = this.loginForm.get('correo').value;
    let contrasena = this.loginForm.get('passwd').value;

    this.auth.login(this.credentials).subscribe(
      ()=>{
       
        this.router.navigate(['principal'])
        
      },
      err => {
        console.error(err)
      }
    )
    
    
    //if (los datos del usuario estan buenos)
    //{
      //if es superusuario
        this.servicioDatos.showTipoUsuario = true;
      //if es asistente
        //this.servicioDatos.showTipoUsuario = false;

      this.servicioDatos.showCorreo = email;
      this.servicioDatos.showSesion = true;
      
    //}
  }

}
