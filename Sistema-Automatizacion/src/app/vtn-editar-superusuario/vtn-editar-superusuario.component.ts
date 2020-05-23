import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioDatosService } from '../shared/servicio-datos.service'
import { AuthenticationService } from '../authentication.service'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-vtn-editar-superusuario',
  templateUrl: './vtn-editar-superusuario.component.html',
  styleUrls: ['./vtn-editar-superusuario.component.css']
})
export class VtnEditarSuperusuarioComponent implements OnInit {
  hide = true;

  constructor(private http: HttpClient, private servicioDatos: ServicioDatosService) { }

  ngOnInit(): void {
  }

  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  editarSupForm = new FormGroup ({
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
    console.log(this.editarSupForm.value);

    //agarrar correo superusuario 
    let correopr = this.servicioDatos.showCorreo;

    let correnv = this.editarSupForm.get('correo').value;
    let newpass = this.editarSupForm.get('passwd').value;

    const formData = { correo: correopr, password: newpass, correoEnvio: correnv }

    //actualiza correo en superusuario
    this.http.put<any>('/router/editSuper', formData).subscribe(
      (res) => {
        if (res.answer) {
          console.log('Superusuario actualizado')
        }
      },
      (err) => console.log(err)
    );
  
  }

}
