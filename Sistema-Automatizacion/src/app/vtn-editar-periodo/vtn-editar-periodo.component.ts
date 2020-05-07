import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-vtn-editar-periodo',
  templateUrl: './vtn-editar-periodo.component.html',
  styleUrls: ['./vtn-editar-periodo.component.css']
})
export class VtnEditarPeriodoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  bimestreSource: string = "direct";
  fechaInicio = new FormControl(new Date());
  fechaFinal = new FormControl(new Date());
}
