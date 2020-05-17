import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioDatosService } from '../shared/servicio-datos.service'
import { AuthenticationService, TokenPayload, Tokenuser } from '../authentication.service'
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-vtn-login',
  templateUrl: './vtn-login.component.html',
  styleUrls: ['./vtn-login.component.css']
})
export class VtnLoginComponent implements OnInit {
  credentials: TokenPayload = {
    correo: '',
    password: '',
  }
  credsuperuser:Tokenuser ={
    correo:''
  }

  hide = true;

  constructor( private http: HttpClient, private auth: AuthenticationService, private router: Router, private servicioDatos: ServicioDatosService) { }

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

    this.credentials.correo = email;
    this.credentials.password = contrasena;

    let boole


    console.log("espero?")
    this.auth.login(this.credentials).subscribe(
      (res) => {

        const formData = { correo: email }
        //EXPLICAR ESTO
        this.http.post<any>('/router/isSuper', formData).subscribe(
          (res) => {
            if (res.answer) {
              this.servicioDatos.showTipoUsuario = true;

            } else {
              this.servicioDatos.showTipoUsuario = false;

            }
            this.router.navigate(['principal'])
          },
          (err) => console.log(err)
        );




      },
      err => {
        console.error(err)
      }
    )

    this.servicioDatos.showCorreo = email;
    this.servicioDatos.showSesion = true;


}
}
