import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService, TokenPeriod } from '../authentication.service'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { NotificationService } from '../shared/notification.service';


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

  constructor(private auth: AuthenticationService, private http: HttpClient,
    private notificationService: NotificationService,

  ) { }

  ngOnInit(): void {
  }

  bimestreSource: string = "direct";
  fechaInicio = new FormControl(new Date());
  fechaFinal = new FormControl(new Date());

  nuevoPForm = new FormGroup({
    bimestre: new FormControl(''),
    fechaI: new FormControl(''),
    fechaF: new FormControl('')
  });

  onSubmit() {
    // Conectar con la logica para el login

    //Cuando ocupen sacar un solo dato es con
    //console.log(this.loginForm.get('correo').value);
    //tenemos que sacar el ano


    let period = this.nuevoPForm.get('bimestre').value;
    let fechain = this.nuevoPForm.get('fechaI').value;
    let fechafin = this.nuevoPForm.get('fechaF').value;
   
    const formData = { periodo: period, fechaInicio: fechain, fechaCierre: fechafin }

    this.http.post<any>('/router/CrearPeriodo', formData).subscribe(
      (res) => {
        console.log(res);
        if (Array.isArray(res)) {
          this.notificationService.success('Datos guardados');
          //metodod de mel
        } else
          this.notificationService.warning('Error al crear')
      },
      (err) => {
        console.log("err");

        this.notificationService.warning('Error')
      }

    );




  }

  //tenemos que meter el periodo en editar periodo

}
