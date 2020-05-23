import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioDatosService } from '../shared/servicio-datos.service'
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-barra-sistema',
  templateUrl: './barra-sistema.component.html',
  styleUrls: ['./barra-sistema.component.css']
})
export class BarraSistemaComponent implements OnInit {

  show: boolean;

  constructor(private router: Router, private servicioDatos: ServicioDatosService, private http: HttpClient) { }

  ngOnInit(): void {
    this.show = sessionStorage.getItem('tipoUsuario')=='true';
  }

  signOut() {
    sessionStorage.setItem('sesion', 'false');
    this.router.navigate(['']);
  }

  principal() {
    this.router.navigate(['principal']);
  }

  editarPerfil() {
    if(sessionStorage.getItem('tipoUsuario') == 'true') {
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

    this.http.post<any>('/router/CerrarPeriodoActual', {}).subscribe(
      (res) => {console.log(res)},
      (err) => console.log(err)
    );
    //Valida en la BD si hay un periodo vigente, y lo cierra
    //Retorna true o false si lo cerro
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
    // this.router.navigate(['principal'])
  }

  verHistoricos() {
    // this.router.navigate(['principal'])
  }

  importarPeriodo() {
    this.router.navigate(['importP']);
  }

}
