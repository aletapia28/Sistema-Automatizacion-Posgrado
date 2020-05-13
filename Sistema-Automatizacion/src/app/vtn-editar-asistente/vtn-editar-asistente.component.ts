import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicioDatosService } from '../shared/servicio-datos.service'

@Component({
  selector: 'app-vtn-editar-asistente',
  templateUrl: './vtn-editar-asistente.component.html',
  styleUrls: ['./vtn-editar-asistente.component.css']
})
export class VtnEditarAsistenteComponent implements OnInit {
  hide = true;

  correoA: string;

  editarAForm = new FormGroup({
    nombre: new FormControl(''),
    cedula: new FormControl(''),
    passwd: new FormControl('')
  });

  constructor(private servicioDatos: ServicioDatosService) {
    this.correoA = servicioDatos.showCorreo;
  }

  ngOnInit(): void {
    //Llamar a la BD y obtener la informacion del asistente para presentarla en pantalla
    this.editarAForm.get('nombre').setValue('Jose');
    
  }

  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debe ingresar un correo electrónico';
    }

    return this.email.hasError('email') ? 'Correo inválido' : '';
  }

  onSubmit() {
    console.log(this.correoA);
    //
    //console.log(this.editarAForm.value);
  }

}
