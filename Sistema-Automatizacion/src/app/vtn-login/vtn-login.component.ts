import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-vtn-login',
  templateUrl: './vtn-login.component.html',
  styleUrls: ['./vtn-login.component.css']
})
export class VtnLoginComponent implements OnInit {
  hide = true;

  constructor() { }

  ngOnInit(): void {
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

}
