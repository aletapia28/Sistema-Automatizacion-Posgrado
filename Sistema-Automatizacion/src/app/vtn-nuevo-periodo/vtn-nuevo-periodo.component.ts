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
    //tenemos que sacar el ano
    let period= this.nuevoPForm.get('bimestre').value;
    let fechain= this.nuevoPForm.get('fechaI').value;
    let fechafin= this.nuevoPForm.get('fechaF').value;
    
    console.log(this.nuevoPForm.value);

    //tenemos que agregar el ano a periodo
    this.credentials.periodo = period
    this.credentials.fechaInicio = fechain
    this.credentials.fechaCierre = fechafin
    

    this.credentials.periodo = period
    this.credentials.fechaInicio = fechain
    this.credentials.fechaCierre = fechafin

    const formData = { periodo: period, fechaInicio:fechain, fechaCierre: fechafin }


    this.http.post<any>('/router/CrearPeriodo', formData).subscribe(
      (res) => {console.log(res)},
      (err) => console.log(err)
    );
  }

  //tenemos que meter el periodo en editar periodo

}
