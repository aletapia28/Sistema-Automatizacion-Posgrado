import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioDatosService } from '../shared/servicio-datos.service'

@Component({
  selector: 'app-barra-sistema',
  templateUrl: './barra-sistema.component.html',
  styleUrls: ['./barra-sistema.component.css']
})
export class BarraSistemaComponent implements OnInit {

  show: boolean;

  constructor(private router: Router, private servicioDatos: ServicioDatosService) { }

  ngOnInit(): void {
    this.show = this.servicioDatos.showTipoUsuario;
  }

  signOut() {
    this.servicioDatos.showSesion = false;
    this.router.navigate(['']);
  }

  principal() {
    this.router.navigate(['principal']);
  }

  editarPerfil() {
    if(this.servicioDatos.showTipoUsuario) {
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
