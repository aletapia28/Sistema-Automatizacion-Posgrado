import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-vtn-crear-usuario',
  templateUrl: './vtn-crear-usuario.component.html',
  styleUrls: ['./vtn-crear-usuario.component.css']
})
export class VtnCrearUsuarioComponent implements OnInit {
  hide = true;

  constructor() { }

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
  }

}
