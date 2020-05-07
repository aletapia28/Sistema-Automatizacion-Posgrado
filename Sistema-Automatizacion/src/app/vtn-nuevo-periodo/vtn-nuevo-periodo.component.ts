import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-vtn-nuevo-periodo',
  templateUrl: './vtn-nuevo-periodo.component.html',
  styleUrls: ['./vtn-nuevo-periodo.component.css']
})

export class VtnNuevoPeriodoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  contactName: string = "";
  contactAddress: string = "";
  bimestreSource: string = "direct";
  contactGender: string = "male";
  isDeleted: boolean = false;
  fechaInicio = new FormControl(new Date());
  fechaFinal = new FormControl(new Date());

  public saveCustomer() {
    /* Typically this method will be used to send the contact form to a server to save it*/
  }

}
