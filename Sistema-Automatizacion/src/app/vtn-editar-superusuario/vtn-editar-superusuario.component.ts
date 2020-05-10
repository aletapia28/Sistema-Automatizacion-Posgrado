import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vtn-editar-superusuario',
  templateUrl: './vtn-editar-superusuario.component.html',
  styleUrls: ['./vtn-editar-superusuario.component.css']
})
export class VtnEditarSuperusuarioComponent implements OnInit {
  hide = true;

  constructor() { }

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
  }

}
