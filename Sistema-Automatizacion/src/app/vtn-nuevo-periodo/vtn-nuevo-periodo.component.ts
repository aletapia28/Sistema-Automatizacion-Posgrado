import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vtn-nuevo-periodo',
  templateUrl: './vtn-nuevo-periodo.component.html',
  styleUrls: ['./vtn-nuevo-periodo.component.css']
})

export class VtnNuevoPeriodoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  bimestreSource: string = "direct";
  fechaInicio = new FormControl(new Date());
  fechaFinal = new FormControl(new Date());

  nuevoPForm = new FormGroup ({
    bimestre: new FormControl(''),
    fechaI: new FormControl(''),
    fechaF: new FormControl('')
  });

  onSubmit() {
    // Conectar con la logica para el login

    //Cuando ocupen sacar un solo dato es con
    //console.log(this.loginForm.get('correo').value);
    
    console.log(this.nuevoPForm.value);
  }

}
