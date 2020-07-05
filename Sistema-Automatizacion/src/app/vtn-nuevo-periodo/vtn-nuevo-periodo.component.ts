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

  nuevoPForm = new FormGroup({
    bimestre: new FormControl(''),
    fechaI: new FormControl(''),
    fechaF: new FormControl('')
  });

  onSubmit() {
    let period: string = this.nuevoPForm.get('bimestre').value;
    let fechain = this.nuevoPForm.get('fechaI').value;
    let fechafin = this.nuevoPForm.get('fechaF').value;
    
    if (period.length > 0) {
      const formData = { periodo: period, fechaInicio: fechain, fechaCierre: fechafin }
      this.http.post<any>('/router/CrearPeriodo', formData).subscribe(
        (res) => {
          if (Array.isArray(res)) {
            this.notificationService.success('Datos guardados');
            this.http.get<any>('/router/getPeriodoActual').subscribe(
              (respost) => {
                let periodoActual = respost[0];
                if (periodoActual.length == 1) {
                  sessionStorage.setItem('periodoVigente', 'true');
                  sessionStorage.setItem('periodoActual', periodoActual[0].periodo);
                }
                else {
                  sessionStorage.setItem('periodoVigente', 'false');
                }
              }
            );
          } else
            this.notificationService.warning('Error al crear')
        },
        (err) => {
          this.notificationService.warning('Error')
        }
      );
    }
  }
}
