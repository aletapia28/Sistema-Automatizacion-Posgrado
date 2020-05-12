import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-sistema',
  templateUrl: './barra-sistema.component.html',
  styleUrls: ['./barra-sistema.component.css']
})
export class BarraSistemaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  signOut() {
    this.router.navigate(['']);
  }

  principal() {
    this.router.navigate(['principal']);
  }

  editarPerfil() {
    // Si es de tipo superusuario
    this.router.navigate(['editSup']);
    // Si es asistente
    // this.router.navigate(['editAsis']);
  }

  crearPeriodo() {
    this.router.navigate(['crearP']);
  }

  editarPeriodo() {
    this.router.navigate(['editPe']);
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
