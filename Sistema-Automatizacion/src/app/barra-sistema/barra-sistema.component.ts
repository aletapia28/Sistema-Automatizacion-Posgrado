import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioDatosService } from '../shared/servicio-datos.service'
import { HttpClient } from '@angular/common/http'
import { NotificationService } from '../shared/notification.service';
import { DialogService } from '../shared/dialog.service';
// import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { DescargarMemoComponent } from '../descargar-memo/descargar-memo.component';

@Component({
  selector: 'app-barra-sistema',
  templateUrl: './barra-sistema.component.html',
  styleUrls: ['./barra-sistema.component.css']
})
export class BarraSistemaComponent implements OnInit {

  show: boolean;

  constructor(
    private router: Router, 
    private servicioDatos: ServicioDatosService, 
    private http: HttpClient,
    private notificationService: NotificationService,
    private dialog: DialogService) 
    { }

  ngOnInit(): void {
    this.show = sessionStorage.getItem('tipoUsuario') == 'true';
  }

  signOut() {
    sessionStorage.setItem('sesion', 'false');
    this.router.navigate(['']);
  }

  principal() {
    this.router.navigate(['principal']);
  }

  editarPerfil() {
    if (sessionStorage.getItem('tipoUsuario') == 'true') {
      //Si es de tipo superusuario
      this.router.navigate(['editSup']);
    }
    else {
      //Si es asistente
      this.router.navigate(['editAsis']);
    }
  }

  crearPeriodo() {
    this.router.navigate(['crearP']);
  }

  editarPeriodo() {
    this.router.navigate(['editPe']);
  }

  cerrarPeriodo() {
    if (sessionStorage.getItem('periodoVigente') == 'true') {
      this.http.get<any>('/router/getPeriodoActual').subscribe(
        (respost) => {
          let periodoActual = respost[0];
          if (periodoActual.length == 1) {
            let periodo: string = periodoActual[0].periodo;
            const formData = { periodo: periodo }
            this.http.post<any>('/router/CerrarPeriodoActual', formData).subscribe(
              (res) => {
                this.notificationService.success('Período cerrado con éxito');
                sessionStorage.setItem('periodoVigente', 'false');
              },
              (err) => console.log(err)
            );
          } else {
            this.notificationService.warning('No existe un período vigente');
          }
        }
      );
    } else {
      this.notificationService.warning('No existe un período vigente'); 
    }
  }

  buscarPostulante() {
    // this.router.navigate(['principal'])
  }

  crearUsuario() {
    this.router.navigate(['crearU']);
  }

  manejoAsistente() {
    this.router.navigate(['eliminarAsis']);
  }

  editFormula() {
    this.router.navigate(['editFor']);
  }

  verHistoricos() {
    // this.router.navigate(['principal'])
  }

  importarPeriodo() {
    this.router.navigate(['importP']);
  }

  importarArchivo() {
    let vigente = sessionStorage.getItem('periodoVigente');
    if (vigente == 'true')
      this.router.navigate(['importA']);
    else
      this.notificationService.warning('Actualmente no hay un período vigente\npara importar postulantes');
  }

  analisisTablas() {
    
  }

  analisisGraficas() {

  }

  generarMemo() {

    this.dialog.openGenerateMemo("Formato de descarga","Debe escoger uno de los siguientes tipos de descarga");



  }

}
