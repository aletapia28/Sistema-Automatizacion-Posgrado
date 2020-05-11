import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vtn-importar-periodo',
  templateUrl: './vtn-importar-periodo.component.html',
  styleUrls: ['./vtn-importar-periodo.component.css']
})
export class VtnImportarPeriodoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  importarPForm = new FormGroup ({
    bimestre: new FormControl(''),
    fechaI: new FormControl(''),
    fechaF: new FormControl(''),
    archivo: new FormControl('')
  });

  bimestreSource: string = "direct";
  fechaInicio = new FormControl(new Date());
  fechaFinal = new FormControl(new Date());

  onSubmit() {
    // Conectar con la logica para el login

    //Cuando ocupen sacar un solo dato es con
    //console.log(this.loginForm.get('correo').value);
    
    console.log(this.importarPForm.value);
  }

}
