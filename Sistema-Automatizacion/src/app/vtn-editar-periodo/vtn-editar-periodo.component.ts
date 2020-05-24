import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService, TokenPeriod } from '../authentication.service'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../shared/notification.service';


@Component({
  selector: 'app-vtn-editar-periodo',
  templateUrl: './vtn-editar-periodo.component.html',
  styleUrls: ['./vtn-editar-periodo.component.css']
})
export class VtnEditarPeriodoComponent implements OnInit {

  bimestreSource: string = "direct";
  fechaInicio = new FormControl(new Date());
  fechaFinal = new FormControl(new Date());

  periodos: [] = [];

  credentials: TokenPeriod = {
    periodo: '',
    fechaInicio: null,
    fechaCierre: null
  }


  constructor(
    private auth: AuthenticationService, 
    private http: HttpClient,
    private notificationService: NotificationService,

    ) { }

  ngOnInit(): void {
    this.cargarPeriodos();
  }

  editarPeForm = new FormGroup({
    bimestre: new FormControl(''),
    fechaInicio: new FormControl(''),
    fechaFinal: new FormControl('')
  });

  cargarPeriodos() {
    this.http.get<any>('/router/VerPeriodos').subscribe(
      (respost) => {
        this.periodos = respost[0];
      });
  }
  cargarFechas(event) {
    this.http.post<any>('/router/getPeriodoEspecifico', event).subscribe(
      (respost) => {
        let periodo = respost[0];
        if (periodo.length == 1) {
          this.editarPeForm.get("fechaInicio").setValue(periodo[0].fechaInicio);
          this.editarPeForm.get("fechaFinal").setValue(periodo[0].fechaCierre);
        }
      });
  }

  onSubmit() {
    console.log(this.editarPeForm.value);

    let bim = this.editarPeForm.get('bimestre').value;
    let fechaIn = this.editarPeForm.get('fechaInicio').value;
    let fechaCi = this.editarPeForm.get('fechaFinal').value;

    this.credentials.periodo = bim
    this.credentials.fechaInicio = fechaIn
    this.credentials.fechaCierre = fechaCi

    const formData = { periodo: bim, fechaInicio: fechaIn, fechaCierre: fechaCi }


    this.http.post<any>('/router/EditarPeriodo', formData).subscribe(
      (res) => {
        if (res.answer) {
          console.log('cambios realizados')
          this.notificationService.success('Datos guardados');
        } else {
          console.log('error en el update')
          this.notificationService.warning('Ocurrio un error');
        }
      },
      (err) => console.log(err)
    );


    //llamada para retornar todos los periodos
    /*
    this.http.put<any>('/router/getallperiodos', bim).subscribe(
      (res)=>{
        if (res.answer){
          console.log('Contrasena actualizada')
        }
      },
      (err) => console.log(err)
    );*/


  }
}
