import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm, FormGroupDirective } from '@angular/forms';
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
  fechaInicio = new FormControl('', [Validators.required]);
  fechaFinal = new FormControl('', [Validators.required]);

  periodos: [] = [];

  constructor(
    private auth: AuthenticationService,
    private http: HttpClient,
    private notificationService: NotificationService,

  ) { }

  ngOnInit(): void {
    this.cargarPeriodos();
  }

  editarPeForm = new FormGroup({
    bimestre: new FormControl('', [Validators.required]),
    fechaInicio: new FormControl('', [Validators.required]),
    fechaFinal: new FormControl('', [Validators.required])
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
          console.log(periodo[0].fechaInicio)
          console.log(periodo[0].fechaCierre)
          this.editarPeForm.get("fechaInicio").setValue(periodo[0].fechaInicio);
          this.editarPeForm.get("fechaFinal").setValue(periodo[0].fechaCierre);
        }
      });
  }

  onSubmit() {
    let bim = this.editarPeForm.get('bimestre').value;
    let fechaIn = this.editarPeForm.get('fechaInicio').value;
    let fechaCi = this.editarPeForm.get('fechaFinal').value;
    if (bim.periodo != null) {
      const formData = { periodo: bim, fechaInicio: fechaIn, fechaCierre: fechaCi }
      this.http.post<any>('/router/EditarPeriodo', formData).subscribe(
        (res) => {
          if (res.affectedRows > 0) {
            this.notificationService.success('Datos actualizados');
          } else {
            this.notificationService.warning('Ocurrio un error');
          }
        },
        (err) => this.notificationService.warning('Ocurrio un error')
      );
    }
  }
}
