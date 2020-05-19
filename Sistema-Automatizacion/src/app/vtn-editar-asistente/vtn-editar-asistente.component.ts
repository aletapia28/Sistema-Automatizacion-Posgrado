import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { ServicioDatosService } from '../shared/servicio-datos.service'

@Component({
  selector: 'app-vtn-editar-asistente',
  templateUrl: './vtn-editar-asistente.component.html',
  styleUrls: ['./vtn-editar-asistente.component.css']
})
export class VtnEditarAsistenteComponent implements OnInit {
  hide = true;

  correoA: string;

  constructor(private servicioDatos: ServicioDatosService, private http: HttpClient) {
    this.correoA = servicioDatos.showCorreo;
  }

  ngOnInit(): void {
  }

  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  editarAForm = new FormGroup({
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
    console.log(this.correoA);
    console.log(this.editarAForm.value);
    //necesito agarrar correo pred 
    let correopr = this.servicioDatos.showCorreo;

    let nombr = this.editarAForm.get('nombre').value;
    let ced = this.editarAForm.get('cedula').value;
    let newpass = this.editarAForm.get('passwd').value;

    const formData = { correo: correopr, nombre: nombr, cedula: ced}
    const formData2 = {correo: correopr, password: newpass}
    //update asistente
    this.http.put<any>('/router/updateasistant', formData).subscribe(
      (res) => {
        if (res.answer) {
          console.log('Asistente actualizado nombre, ced')
        }
      },
      (err) => console.log(err)
    );
    //actualiza contrasena en tabla usuario
    this.http.put<any>('/router/updateusuario', formData2).subscribe(
      (res)=>{
        if (res.answer){
          console.log('Contrasena actualizada')
        }
      },
      (err) => console.log(err)
    );

  }

}
