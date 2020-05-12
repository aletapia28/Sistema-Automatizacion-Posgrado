import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioDatosService {

  _sesionAbierta: boolean;
  _superusuario: boolean;
  _correo: string;

  constructor() { }

  set showSesion(value: boolean){
    this._sesionAbierta = value;
  }

  get showSesion(): boolean {
    return this._sesionAbierta;
  }

  set showTipoUsuario(value: boolean){
    this._superusuario = value;
  }

  get showTipoUsuario(): boolean {
    return this._superusuario;
  }

  set showCorreo(value: string){
    this._correo = value;
  }

  get showCorreo(): string {
    return this._correo;
  }
}
