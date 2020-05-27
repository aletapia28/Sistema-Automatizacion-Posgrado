import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vtn-editar-postulante',
  templateUrl: './vtn-editar-postulante.component.html',
  styleUrls: ['./vtn-editar-postulante.component.css']
})
export class VtnEditarPostulanteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  email2 = new FormControl('', [
    Validators.email,
  ]);

  editarPosForm = new FormGroup ({
    cedula: new FormControl(''),
    nombre: new FormControl(''),
    telefono1: new FormControl(''),
    telefono2: new FormControl(''),
    correo: new FormControl(''),
    correo2: new FormControl(''),
    ingles: new FormControl(true),
    gradoAca: new FormControl(''),
    universidad: new FormControl(''),
    afinidad: new FormControl(''),
    acreditada: new FormControl(false),
    puesto: new FormControl(''),
    experiencia: new FormControl(''),
    cAprovechamiento: new FormControl(''),
    tTecnico: new FormControl(true),
    cMaestria: new FormControl(''),
    tDiplomado: new FormControl(true)
  });

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debe ingresar un correo electrónico';
    }

    return this.email.hasError('email') ? 'Correo inválido' : '';
  }

  getErrorMessage2() {
    return this.email2.hasError('email') ? 'Correo inválido' : '';
  }

  onSubmit () {
    console.log(this.editarPosForm.value);
  }
}
