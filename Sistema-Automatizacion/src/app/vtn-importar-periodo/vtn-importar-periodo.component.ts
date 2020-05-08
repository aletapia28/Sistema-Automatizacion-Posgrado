import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-vtn-importar-periodo',
  templateUrl: './vtn-importar-periodo.component.html',
  styleUrls: ['./vtn-importar-periodo.component.css']
})
export class VtnImportarPeriodoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  bimestreSource: string = "direct";
  fechaInicio = new FormControl(new Date());
  fechaFinal = new FormControl(new Date());
}
