import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vtn-editar-periodo',
  templateUrl: './vtn-editar-periodo.component.html',
  styleUrls: ['./vtn-editar-periodo.component.css']
})
export class VtnEditarPeriodoComponent implements OnInit {

  bimestreSource: string = "direct";
  fechaInicio = new FormControl(new Date());
  fechaFinal = new FormControl(new Date());

  constructor() { }

  ngOnInit(): void {
  }

  editarPeForm = new FormGroup ({
    bimestre: new FormControl(''),
    fechaInicio: new FormControl(''),
    fechaFinal: new FormControl('')
  });
  
  onSubmit() {
    console.log(this.editarPeForm.value);
  }
}
