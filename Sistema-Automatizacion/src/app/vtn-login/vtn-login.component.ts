import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioDatosService } from '../shared/servicio-datos.service'
import { AuthenticationService, TokenPayload, Tokenuser } from '../authentication.service'
import { HttpClient } from '@angular/common/http'
import { ErrorStateMatcher } from '@angular/material/core';
import { NotificationService } from '../shared/notification.service';
import { DialogService } from '../shared/dialog.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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
  credsuperuser: Tokenuser = {
    correo: ''
  }

  matcher = new MyErrorStateMatcher();

  hide = true;

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private router: Router,
    private servicioDatos: ServicioDatosService,
    private notificationService: NotificationService,
    private dialog: DialogService
  ) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]),
    passwd: new FormControl('', [Validators.required])
  });

  getErrorMessage() {
    if (this.loginForm.get('correo').hasError('required')) {
      return 'Debe ingresar un correo electrónico';
    }

    return this.loginForm.get('correo').hasError('email') ? 'Correo inválido' : '';
  }

  onSubmit() {
    //LOGIN
    let email:string = this.loginForm.get('correo').value.replace(/\s/g, "");
    let contrasena:string = this.loginForm.get('passwd').value.replace(/\s/g, "");
    if ((email.length > 0) && (contrasena.length > 0)) {

      this.credentials.correo = email;
      this.credentials.password = contrasena;

      this.auth.login(this.credentials).subscribe(
        (res) => {
          const formData = { correo: email }
          //EXPLICAR ESTO
          this.http.post<any>('/router/isSuper', formData).subscribe(
            (res) => {
              sessionStorage.setItem('correo', email);
              sessionStorage.setItem('sesion', 'true');
              if (res.answer) {
                sessionStorage.setItem('tipoUsuario', 'true');

              } else {
                sessionStorage.setItem('tipoUsuario', 'false');
                sessionStorage.setItem('correoAsistente', email);
              }
              this.router.navigate(['principal'])
            },
            (err) => console.log(err)
          );

        },
        err => {
          this.notificationService.warning('Los datos ingresados no corresponden a ningún usuario');
        }
      )
    }
  }
  recuperar(){
    this.dialog.openRecoverPass("Recuperar contraseña","Digite el correo del usuario ");
  }
}
