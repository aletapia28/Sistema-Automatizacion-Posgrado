import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-vtn-editar-postulante',
  templateUrl: './vtn-editar-postulante.component.html',
  styleUrls: ['./vtn-editar-postulante.component.css']
})
export class VtnEditarPostulanteComponent implements OnInit {
  
  nivelIngles: boolean = true;
  acreditada: boolean = true;
  tecnico: boolean = true;
  diplomado: boolean = true;
  gradoAcademico: string = "direct";
  afinidad: string = "direct";
  puesto: string = "direct";

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

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debe ingresar un correo electrónico';
    }

    return this.email.hasError('email') ? 'Correo inválido' : '';
  }

  getErrorMessage2() {
    return this.email2.hasError('email') ? 'Correo inválido' : '';
  }

}
