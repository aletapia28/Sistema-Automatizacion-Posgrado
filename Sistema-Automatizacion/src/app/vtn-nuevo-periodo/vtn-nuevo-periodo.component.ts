import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService,TokenPeriod } from '../authentication.service'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-vtn-nuevo-periodo',
  templateUrl: './vtn-nuevo-periodo.component.html',
  styleUrls: ['./vtn-nuevo-periodo.component.css']
})

export class VtnNuevoPeriodoComponent implements OnInit {

  credentials: TokenPeriod = {
    periodo: '',
    fechaInicio: null,
    fechaCierre: null
  }

  constructor(private auth: AuthenticationService, private http: HttpClient) { }

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
    let period= this.nuevoPForm.get('bimestre').value;
    let fechain= this.nuevoPForm.get('fechaI').value;
    let fechafin= this.nuevoPForm.get('fechaF').value;
    
    console.log(this.nuevoPForm.value);

    this.credentials.periodo = period
    this.credentials.fechaInicio = fechain
    this.credentials.fechaCierre = fechafin


    this.auth.registerperiodo(this.credentials).subscribe(
      (user) =>
      {console.log('crear periodo' + user)}
      //luego lo reg como asistente

    )
  }

}
